package MainPackage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import org.apache.commons.io.IOUtils;
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

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static MainPackage.Stages.FOUR_CLUB.*;

public class FourClub extends Helpers {
    private static final String[] INITIAL_HEADERS = {"Host: www.4club.com", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0", "Accept: application/json, " +
            "text/javascript, */*; q=0.01", "Accept-Language: en-GB,en;q=0.5", "Accept-Encoding: gzip, deflate, br", "X-Requested-With: XMLHttpRequest", "Connection: keep-alive", "Pragma: no-cache", "Cache-Control: no-cache"};
    private List<BasicHeader> HEADERS;

    final private Account account;
    private CookieStore cookieStore = new BasicCookieStore();
    private Set<String> idSet = new HashSet<>();
    private static final String cities = " Moscow | 187219|\n" +
            "    (Sankt-Peterburg)|100787|66\n" +
            "    Novosibirsk (Novosibirsk)|495117|53\n" +
            "    Yekaterinburg (Sverdlovsk)|463211|71\n" +
            "    Novgorod (Novgorod)|168511|52\n" +
            "    Samara (Samara)|101664|65\n" +
            "    Omsk (Omsk)|492924|54\n" +
            "    Kazan (Tatarstan)|272141|73\n" +
            "    Chelyabinsk (Tsjeljabinsk)|532314|13\n" +
            "    Rostov-na-Donu (Rostov)|108520|61\n" +
            "    Ufa (Perm)|852336|90\n" +
            "    Volgograd (Volgograd)|27848|84\n" +
            "    Perm’ (Perm)|141178|90\n" +
            "    Krasnoyarsk (Krasnoyarskiy)|512514|91\n" +
            "    Voronezh (Voronezj)|26161|86\n" +
            "    Saratov (Saratov)|100297|67\n" +
            "    Krasnodar (Krasnodarskiy)|243292|38\n" +
            "    Tolyatti (Samara)|49617|65\n" +
            "Vladivostok (Primorskiy)|565470|59\n" +
            "Russian Federation|855784|00";

    public FourClub(Account account) {
        this.account = account;
        HEADERS = new ArrayList<>(Arrays.asList(_toHeader(INITIAL_HEADERS)));
        _setPrintHeaders(true);
        _setApacheLogs(false);

    }


    public Account regiserAcc() throws Exception {
        boolean setProfileFailure = false;
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

    Account run() {
        try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultHeaders(HEADERS).setDefaultCookieStore(cookieStore).build()) {
            requestGet(HOME.getURL(), HOME, httpClient);
            if (checkSuc(_postWithJson(LOGIN.getURL(), LOGIN, loginLoad(account.getEmail(), account.getPassword()), httpClient))) {

                requestGet(MY_PROFILE.getURL(), MY_PROFILE, httpClient);

            /*for (String city : cities.split("\\n")) {
                extractIds(_postWithJson(ONLINE_LIST.getURL(), ONLINE_LIST, onlineSearchLoad(city.trim().split("\\|")), httpClient));
            }*/
                extractIds(_postWithJson(ONLINE_LIST.getURL(), ONLINE_LIST, onlineSearchLoad(cities.split("\\n")[0].trim().split("\\|")), httpClient));
                int i = 0;
                for (String id : idSet) {
                    checkSuc(_postWithJson(SEND_MESSAGE.getURL(), SEND_MESSAGE, messageLoad(id), httpClient, new BasicHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")));
                    if (i++ > 20) break;
                }
                System.out.println(idSet);
                System.out.println(idSet.size());
            } else throw new StageException("Login Failed", LOGIN);
        } catch (Exception e) {
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
        load.add(new BasicNameValuePair("countryCode", "RU"));
        // Moscow
        load.add(new BasicNameValuePair("idCity", "187219"));
        load.add(new BasicNameValuePair("age", "18"));
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
        _printHeaders(post.getAllHeaders(), stage, true);

        try (CloseableHttpResponse response = client.execute(post)) {
            System.out.println(response.getStatusLine());
            entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            _printHeaders(response.getAllHeaders(), stage, false);
            _writeFile(entityString, stage, encoding);
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
    private List<BasicNameValuePair> onlineSearchLoad(String[] city) {
        List<BasicNameValuePair> load = new ArrayList<>();

        load.add(new BasicNameValuePair("type", "base"));
        load.add(new BasicNameValuePair("sexualOrientation", "1"));
        load.add(new BasicNameValuePair("sex[]", "m"));
        load.add(new BasicNameValuePair("ageFrom", "18"));
        load.add(new BasicNameValuePair("ageTo", "90"));
        load.add(new BasicNameValuePair("country", "RU"));
        load.add(new BasicNameValuePair("city", city[0].trim()));
        load.add(new BasicNameValuePair("cityId", city[1].trim()));
        load.add(new BasicNameValuePair("online", "1"));
        load.add(new BasicNameValuePair("hasPhoto", ""));
        load.add(new BasicNameValuePair("videoChat", ""));
        return load;
    }

    private void extractIds(JsonObject response) {
        List<LinkedTreeMap> list = new Gson().fromJson(response.get("users"), ArrayList.class);
        list.forEach(u -> idSet.add((String) u.get("userid")));
        //System.out.println(idSet);
    }

    private List<String[]> getCityCodes() {
        return Arrays.stream(cities.split("\\n")).map(s -> s.split("\\|")).map(s -> new String[]{s[0].trim().split("\\s")[0].replace("(", "").replace(")", ""), s[1].trim()}).collect(Collectors.toList());
    }

    private List<BasicNameValuePair> messageLoad(String id) throws Exception {
        String load = "Карма Сука";
// mock id 102098638
        List<BasicNameValuePair> list = new ArrayList<>();
        list.add(new BasicNameValuePair("userid", id));
        list.add(new BasicNameValuePair("message", load));
        return list;
    }

    enum Stages {
        HOME("https://www.4club.com"),
        REGISTER("https://www.4club.com/register"),
        LOGIN("https://www.4club.com/login"),
        SET_PROFILE("https://www.4club.com/myprofile/save"),
        MY_PROFILE("https://www.4club.com/myprofile"),
        PHOTO("https://www.4club.com/popup/uploadmedia/photo"),
        ONLINE_LIST("https://www.4club.com/search/result/online"),
        UPLOAD_PHOTO("https://www.4club.com/media/uploadphoto"),
        MESSAGES("https://www.yoursex.ru/messages.html"),
        SEND_MESSAGE("https://www.4club.com/message/send"),
        NEW_FACES("https://www.4club.com/search/result/newfaces"),
        SPAMMED_ID_SET("");

        private String URL;

        Stages(final String URL) {
            this.URL = URL;
        }

        private String getURL() {
            return URL;
        }

        @Override
        public String toString() {
            return this.name() + ".html";
        }
    }
}
