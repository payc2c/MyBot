package MainPackage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import static MainPackage.Stages.FOUR_CLUB.*;

public class FourClub extends Helpers {
    private static final String[] INITIAL_HEADERS = {"Host: www.4club.com", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0", "Accept: application/json, " +
            "text/javascript, */*; q=0.01", "Accept-Language: en-GB,en;q=0.5", "Accept-Encoding: gzip, deflate, br", "X-Requested-With: XMLHttpRequest", "Connection: keep-alive", "Pragma: no-cache", "Cache-Control: no-cache"};

    private static final String TEST_HEADERS = "Host: www.4club.com\n" +
            "Connection: keep-alive\n" +
            "Pragma: no-cache\n" +
            "Cache-Control: no-cache\n" +
            "Accept: application/json, text/javascript, */*; q=0.01\n" +
            "Sec-Fetch-Dest: empty\n" +
            "X-Requested-With: XMLHttpRequest\n" +
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36\n" +
            "DNT: 1\n" +
            "Content-Type: application/x-www-form-urlencoded; charset=UTF-8\n" +
            "Sec-Fetch-Site: same-origin\n" +
            "Sec-Fetch-Mode: cors\n" +
            "Accept-Encoding: gzip, deflate, br\n" +
            "Accept-Language: en-GB,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,uk-UA;q=0.6,uk;q=0.5,en-US;q=0.4";

    private static final String cities = " Moscow|187219|1\n" +
            "Sankt-Peterburg|100787|66\n" +
            "Novosibirsk|495117|53\n" +
            "Yekaterinburg|463211|71\n" +
            "Novgorod|168511|52\n" +
            "Samara|101664|65\n" +
            "Omsk|492924|54\n" +
            "Kazan|272141|73\n" +
            "Chelyabinsk|532314|13\n" +
            "Rostov-na-Donu|108520|61\n" +
            "Ufa|852336|90\n" +
            "Volgograd|27848|84\n" +
            "Perm’|141178|90\n" +
            "Krasnoyarsk|512514|91\n" +
            "Voronezh|26161|86\n" +
            "Saratov|100297|67\n" +
            "Krasnodar|243292|38\n" +
            "Tolyatti|49617|65\n" +
            "Vladivostok|565470|59";

    private List<BasicHeader> HEADERS;
    final private Account account;
    private CookieStore cookieStore = new BasicCookieStore();
    private Set<String> idSet = new HashSet<>();

    public FourClub(Account account) {
        this.account = account;
        HEADERS = new ArrayList<>(Arrays.asList(_toHeader(INITIAL_HEADERS)));
        _setPrintHeaders(false);
        _setApacheLogs(false);

    }


    private AtomicLong counter = new AtomicLong(0);

    private synchronized boolean runParallel(boolean fromFile, int threads, String phone, int delay) {
        int maxThreads = 20;
        List<Future> futures = new ArrayList<>();
        List<Account> accounts = new ArrayList<>();
        List<Account> accountsInUse = new ArrayList<>();
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailList" + phone + ".txt");
        List<City> cities = Arrays.stream(this.cities.split("\\n")).map(c -> c.split("\\|"))
                .map(c -> new City(c[0], c[1], c[2])).collect(Collectors.toList());

        if (fromFile) {
            if (Files.notExists(path)) registerAccsParallel(20, phone);
            try {
                accounts = Files.readAllLines(path).stream().map(s -> s.split(":"))
                        .map(s -> new Account(s[0], s[1])).collect(Collectors.toList());
                if (accounts.size() < threads) {
                    registerAccsParallel(threads - accounts.size() + 1, phone);
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        ExecutorService taskExecutor = Executors.newFixedThreadPool(threads > maxThreads ? maxThreads : threads);
        CompletionService<Account> taskCompletionService = new ExecutorCompletionService<>(taskExecutor);
        try {
            for (int i = 0; i < threads; i++) {
                Account ac = accounts.get(0);
                makeCallableForRunning(taskCompletionService, ac.setCity(cities.get(i)), delay);
                accountsInUse.add(ac);
                accounts.remove(ac);
            }
            while (!taskExecutor.isTerminated()) {
                Future<Account> future = taskCompletionService.take();
                futures.add(future);
                Account account = future.get();
                if (account.hasError()) {
                    accountsInUse.remove(account);
                    account = accounts.size() > 0 ? accounts.get(0).setCity(account.getCity()) :
                            registerAccs(1, phone).get(0).setCity(account.getCity());
                    accounts.remove(account);
                    accountsInUse.add(account);
                    makeCallableForRunning(taskCompletionService, account, delay);
                    continue;
                }
                if (!account.hasError()) {
                    accountsInUse.remove(account);

                    accounts.add(account);
                    if (accountsInUse.isEmpty()) {
                        taskExecutor.shutdown();
                        break;
                    }
                    continue;
                }
            }
            taskExecutor.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            taskExecutor.shutdownNow();
            writeList(accounts, path);
            System.out.println(counter.get() + "___________Accs Spammed");
        }
        return true;
    }

    protected synchronized List<Account> registerAccsParallel(int accNum, String phoneLogin) {
        int maxThreads = 20;
        List<Account> list = new ArrayList<>();
        List<Callable<Account>> tasks = new ArrayList<>();
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailList" + phoneLogin + ".txt");
        ExecutorService taskExecutor = Executors.newFixedThreadPool(accNum > maxThreads ? maxThreads : accNum);
        CompletionService<Account> taskCompletionService = new ExecutorCompletionService<>(taskExecutor);
        try {

            for (int i = 0; i < accNum; i++) {
                submitCallableForRegistration(taskCompletionService, phoneLogin);
                Thread.sleep(5000);
            }
            while (!taskExecutor.isTerminated()) {
                Account account = taskCompletionService.take().get();
                if (account == null || account.isNull()) {
                    submitCallableForRegistration(taskCompletionService, phoneLogin);
                    continue;
                }
                list.add(checkNullAndWrite(account, path));
                if (list.size() % 10 == 0) System.out.println(list.size());
                if (list.size() == accNum) break;
            }
            path = Paths.get(path.getParent() + "/" + "EmailListNewPara.txt");
            writeList(list, path);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            taskExecutor.shutdownNow();
            writeList(list, path);
            return list;
        }
    }

    private List<Account> registerAccs(int accNum, String phoneLogin) {
        List<Account> list = new ArrayList<>();
        try {
            Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
            path = Paths.get(path + "/" + "EmailList" + phoneLogin + ".txt");

            for (int i = 0; i < accNum; i++) {

                String password = RandomStringUtils.randomAlphanumeric(10);
                FourClub club = new FourClub(new Account(Helpers.getRandomEmail(), password, phoneLogin));
                Account account = club.regiserAcc();
                list.add(checkNullAndWrite(account, path));
                if (i % 10 == 0) System.out.println("SUC emails ........." + i);
            }
            path = Paths.get(path.getParent() + "/" + "EmailListNew.txt");
            writeList(list, path);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    private void makeCallableForRunning(CompletionService<Account> completionService, Account account, int delay) {
        Callable<Account> callable = () -> {
            FourClub club = new FourClub(account);
            return club.run(counter, delay);
        };
        completionService.submit(callable);
    }

    private void submitCallableForRegistration(CompletionService<Account> completionService, String phoneLogin) {
        String password = RandomStringUtils.randomAlphanumeric(10);
        Callable<Account> callable = () -> {
            FourClub club = new FourClub(new Account(Helpers.getRandomEmail(), password, phoneLogin));
            Thread.sleep(1000);
            return club.regiserAcc();
        };

        completionService.submit(callable);
    }

    private synchronized Account checkNullAndWrite(Account account, Path path) throws Exception {
        if (account != null && account.isNotNull()) {
            if (!Files.exists(path.getParent())) Files.createDirectories(path.getParent());
            Files.write(path, (account.getEmail() + ":" + account.getPassword() + "\n").getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            return account;
        }
        return null;
    }

    private void writeList(List<Account> list, Path path) {
        try {
            if (!Files.exists(path.getParent())) Files.createDirectories(path.getParent());
            Files.write(path, list.stream().map(account -> account.getEmail() + ":"
                            + account.getPassword()).collect(Collectors.joining("\n")).getBytes(),
                    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Account regiserAcc() {
        boolean setProfileFailure;
        try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultHeaders(HEADERS).setDefaultCookieStore(cookieStore).build()) {
            requestGet(HOME.getURL(), HOME, httpClient);
            JsonObject registerResponse = _postWithJson(REGISTER.getURL(), REGISTER, registerLoad(), httpClient);
            if (registerResponse != null && checkSuc(registerResponse))
                System.out.printf("%s закончена с логином - %s и паролем - %s\n", REGISTER.name(), account.getEmail(), account.getPassword());
            else {
                System.out.printf("Проблемы с аком %s : %s\n", account.getEmail(), account.getPassword());
                if (registerResponse != null) System.out.println(registerResponse.toString());
                return null;
            }
            if (!checkSuc(_postWithJson(LOGIN.getURL(), LOGIN, loginLoad(account.getEmail(), account.getPassword()), httpClient)))
                return null;
            requestGet(MY_PROFILE.getURL(), MY_PROFILE, httpClient);
            int i = 0;
            do {
                String randomLogin = account.getRandomLogin();
                setProfileFailure = !checkSuc(_postWithJson(SET_PROFILE.getURL(), SET_PROFILE, profileLoad(randomLogin), httpClient));
                i++;
                if (setProfileFailure) {
                    System.out.printf("Не удалось зарегистрировать акк - %s. Попыток - %d\n", randomLogin, i);
                    account.setRandomLogin();
                }

            } while (setProfileFailure && i < 10);
            return account;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    Account run(AtomicLong counter, int delay) throws Exception {
        try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultHeaders(HEADERS).setDefaultCookieStore(cookieStore).build()) {
            requestGet(HOME.getURL(), HOME, httpClient);
            String loginResponse;
            try {
                loginResponse = requestPost(LOGIN.getURL(), LOGIN, loginLoad(account.getEmail(), account.getPassword()), httpClient);
                int i = 0;
                while (loginResponse != null && !loginResponse.contains("true") && !loginResponse.contains("BANNED") && i < 5) {
                    loginResponse = requestPost(LOGIN.getURL(), LOGIN, loginLoad(account.getEmail(), account.getPassword()), httpClient);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            if (loginResponse.contains("BANNED")) return account.setHasError(true);
            if (loginResponse != null && checkSuc(new Gson().fromJson(loginResponse, JsonObject.class))) {
                requestGet(MY_PROFILE.getURL(), MY_PROFILE, httpClient);
                extractIds(_postWithJson(ONLINE_LIST.getURL(), ONLINE_LIST, onlineSearchLoad(), httpClient));
                int i = 0;
                for (String id : idSet) {
                    if (checkSuc(_postWithJson(SEND_MESSAGE.getURL(), SEND_MESSAGE, messageLoad(id),
                            httpClient, new BasicHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"))))
                        counter.incrementAndGet();
                    if (++i % 10 == 0) System.out.printf("Thread No: %d, City: %s, Count: %d\n"
                            , Thread.currentThread().getId() % 19, account.getCity().getName(), i);
                    Thread.sleep(delay);
                }
            } else {
                StageException stageException = new StageException(loginResponse != null ? loginResponse : "Null response", LOGIN, account).writeLogs();
                return account.setHasError(true);
            }
        } catch (Exception e) {
            if (e instanceof StageException) throw e;
            e.printStackTrace();
        }
        return account;
    }

    private List<BasicNameValuePair> loginLoad(String userName, String password) {
        List<BasicNameValuePair> load = new ArrayList<>();

        load.add(new BasicNameValuePair("email", userName));
        load.add(new BasicNameValuePair("password", account.getPassword()));
        load.add(new BasicNameValuePair("remember", "false"));
        return load;
    }

    private List<BasicNameValuePair> registerLoad() {
        List<BasicNameValuePair> load = new ArrayList<>();
        load.add(new BasicNameValuePair("sex", "f"));
        load.add(new BasicNameValuePair("email", account.getEmail()));
        load.add(new BasicNameValuePair("password", account.getPassword()));
        load.add(new BasicNameValuePair("countryCode", "UA"));
        // Moscow
        load.add(new BasicNameValuePair("idCity", "5607"));
        load.add(new BasicNameValuePair("age", "22"));
        load.add(new BasicNameValuePair("sexPreferences[]", "m"));
        return load;
    }

    private boolean checkSuc(JsonObject response) {
        try {
            if (response.get("result").getAsBoolean()) {
                //System.out.println("SUC");
                return true;
            }
        } catch (Exception e) {
            try {

                if (response.get("result").getAsJsonObject().get("result").getAsBoolean()) {
                    // System.out.println("SUC");
                    return true;
                }
            } catch (Exception e1) {
                //System.out.println(response.toString());
                return false;
            }
        }
        return false;
    }

    /**
     * Not working
     */
    private String postPic(String url, Stages stage, String payload, CloseableHttpClient client) throws Exception {
        HttpPost post = new HttpPost(url);
        post.removeHeaders("Content-Type");
        post.addHeader("Content-Type", "multipart/form-data");
        String entityString;
        File file = new File(_getFromDocs("stoya.jpg"));
        System.out.println(file.getName());
        String encoding = "UTF-8";
        HttpEntity entity = MultipartEntityBuilder.create().setContentType(ContentType.MULTIPART_FORM_DATA)
                .addTextBody("verified", "0")
                .addBinaryBody("fileUpload", file, ContentType.IMAGE_JPEG, file.getName())
                .addTextBody("description", "")
                .addTextBody("title", payload)
                .build();
        post.setEntity(entity);
        _printHeaders(post.getAllHeaders(), UPLOAD_PHOTO, true);

        try (CloseableHttpResponse response = client.execute(post)) {
            System.out.println(response.getStatusLine());
            entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            _printHeaders(response.getAllHeaders(), UPLOAD_PHOTO, false);
            _writeFile(entityString, UPLOAD_PHOTO, encoding);
            EntityUtils.consume(entity);
        }
        return entityString;
    }

    private List<BasicNameValuePair> profileLoad(String phoneLogin) throws Exception {
        String json = new String(Files.readAllBytes(Paths.get(_getFromDocs("RegisterData.json"))));
        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(json, Map.class);
        map.put("username", phoneLogin);
        List<BasicNameValuePair> list = new ArrayList<>();
        map.forEach((String k, Object v) -> {
            if (k.equalsIgnoreCase("interests[]") || k.equalsIgnoreCase("languages[]")) {
                ((List) v).forEach(s -> list.add(new BasicNameValuePair(k, String.valueOf(s))));
            } else {
                list.add(new BasicNameValuePair(k, String.valueOf(v)));
            }
        });
        return list;
    }

    /*
    Moscow | 187219|
    Sankt-Peterburg|100787|66
    Novosibirsk (Novosibirsk)|495117|53
    Yekaterinburg (Sverdlovsk)|463211|71
    Novgorod (Novgorod)|168511|52
    Samara (Samara)|101664|65
    Omsk (Omsk)|492924|54
    Kazan (Tatarstan)|272141|73
    Chelyabinsk (Tsjeljabinsk)|532314|13
    Rostov-na-Donu (Rostov)|108520|61
    Ufa (Perm)|852336|90
    Volgograd (Volgograd)|27848|84
    Perm’ (Perm)|141178|90
    Krasnoyarsk (Krasnoyarskiy)|512514|91
    Voronezh (Voronezj)|26161|86
    Saratov (Saratov)|100297|67
    Krasnodar (Krasnodarskiy)|243292|38
    Tolyatti (Samara)|49617|65
     */
    private List<BasicNameValuePair> onlineSearchLoad() {
        List<BasicNameValuePair> load = new ArrayList<>();

        load.add(new BasicNameValuePair("type", "base"));
        load.add(new BasicNameValuePair("sexualOrientation", "1"));
        load.add(new BasicNameValuePair("sex[]", "m"));
        load.add(new BasicNameValuePair("ageFrom", "18"));
        load.add(new BasicNameValuePair("ageTo", "90"));
        load.add(new BasicNameValuePair("country", "RU"));
        load.add(new BasicNameValuePair("city", account.getCity().getName().trim()));
        load.add(new BasicNameValuePair("cityId", account.getCity().getCode().trim()));
        load.add(new BasicNameValuePair("online", "1"));
        load.add(new BasicNameValuePair("hasPhoto", ""));
        load.add(new BasicNameValuePair("videoChat", ""));
        return load;
    }

    private void extractIds(@NotNull JsonObject response) {
        List<LinkedTreeMap> list = new Gson().fromJson(response.get("users"), ArrayList.class);
        list.forEach(u -> idSet.add((String) u.get("userid")));
        //System.out.println(idSet);
    }

    private List<BasicNameValuePair> messageLoad(String id) throws Exception {
        String load = "Привет, я занимаюсь мнтим услуами \"индивидуалка\" могу так же вирт, вац —- апп дeв\"яTь ce\"Mь ce\"Mь чет\"ыре Ho\"ль дBa Ho\"ль oдиH пя\"Tь пя\"Tь или напиши свой я добавлю тебя, пиши \"Привет Алинка\"";
// mock id 102098638
        List<BasicNameValuePair> list = new ArrayList<>();
        list.add(new BasicNameValuePair("userid", id));
        list.add(new BasicNameValuePair("message", load));
        return list;
    }
}
