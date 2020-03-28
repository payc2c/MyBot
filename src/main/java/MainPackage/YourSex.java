package MainPackage;

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

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static MainPackage.YourSex.Stages.*;

public class YourSex extends Helpers {
    private static final String[] INITIAL_HEADERS = {"Origin: https://www.yoursex.ru", "Referer: https://www.yoursex.ru/", "Connection: keep-alive", "Upgrade-Insecure-Requests: 1", "User-Agent: Mozilla/5.0",
            "Accept: text/html"};
    private static List<BasicHeader> HEADERS = new ArrayList<>();
    String message;
    private CookieStore cookieStore = new BasicCookieStore();
    private String userName;
    private String password;
    private String myID;
    private Set<Integer> idSet = new HashSet<>();
    private Set<Integer> spamSet = new HashSet<>();

    public YourSex(String userName, String password) {
        this.userName = userName;
        this.password = password;
        HEADERS.addAll(Arrays.asList(_toHeader(INITIAL_HEADERS)));

    }

    private void readIDs() throws Exception {
        Path p = Paths.get(ID_SET.toString());
        if (Files.exists(p)) {
            String ids = new String(Files.readAllBytes(p), StandardCharsets.UTF_8);
            ids = ids.substring(1, ids.length() - 1);
            idSet = Arrays.stream(ids.split(",")).map(s -> Integer.parseInt(s.trim())).collect(Collectors.toSet());
            System.out.println(idSet);
        } else System.out.println("ERROR");
    }

    void run() throws Exception {
        // readIDs();
        try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultHeaders(HEADERS).setDefaultCookieStore(cookieStore).build()) {
            String queryParam;
            String encoding = "Windows-1251";
            requestGet(HOME.getURL(), HOME, httpClient, encoding);
            Thread.sleep(500);
            requestGet(LOGIN_PAGE.getURL(), LOGIN_PAGE, httpClient, encoding);
            Thread.sleep(500);
            requestPost(LOGIN_USER.getURL(), LOGIN_USER, loginLoad(), httpClient, encoding);
            Thread.sleep(500);
            String response = requestGet(LOGIN_USER.getURL(), LOGIN_USER, httpClient, encoding);
            if (response.contains("<div id=\"userlinks\">")) {
                System.out.println("SUCCESSFUL");
            } else if (response.contains("errorwrap")) System.out.println("FAILURE_BLOCKED");
            else {
                System.out.println("FAILURE_NO_LOGIN");
            }
            extractIDs(response, false, true);

            Thread.sleep(500);
            queryParam = "?want=1&af=18&at=50&some_age=1&city_id=city-4400&for=0";
            response = requestGet(ID_LIST.getURL() + queryParam, FIRST_BATCH_ID_LIST, httpClient, encoding);
            extractIDs(response, true, false);
            Thread.sleep(500);
            requestGet(MESSAGES.getURL(), MESSAGES, httpClient, encoding);
            Thread.sleep(500);
            queryParam = "?want=1&af=18&at=50&some_age=1&city_id=city-4962&for=0";
            //SPB city-4962
            //MSK city-4400
            response = requestPost(HOME.getURL() + queryParam, ID_LIST, idLoad("", ""), httpClient, encoding);
            extractIDs(response, false, false);
            int max = 10000;
            try {
                for (int i = 48; i < max; i = i + 24) {
                    response = requestPost(HOME.getURL() + queryParam, ID_LIST, idLoad("anks", String.valueOf(i)), httpClient, encoding);
                    extractIDs(response, false, false);
                    System.out.println();
                }

            } catch (Exception e) {
                throw new Exception(e);
            } finally {
                writeFile(idSet.toString(), ID_SET);
            }
            queryParam = "?act=xmlout&do=add-dialog-message&PHPSESSID=%s&JsHttpRequest=%s-form";
            System.out.println(idSet.size());
            sendMessage(HOME.getURL(), SEND_MESSAGE, queryParam, httpClient);
            //idSet.forEach(System.out::println);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    //act=xmlout&do=add-dialog-message&PHPSESSID=id294htrgrb149895lq45i8ars&JsHttpRequest=1551924615972419-form
    private String sendMessage(String url, Stages stage, String payLoad, CloseableHttpClient client) throws Exception {
        message = "";
        String phpSID = cookieStore.getCookies().stream().filter(c -> c.getName().equalsIgnoreCase("PHPSESSID")).findAny().get().getValue();
        String load = String.format(payLoad, phpSID, String.valueOf(System.currentTimeMillis()));
        String entityString = null;
        int counter = 0;
        try {

            for (int i : idSet) {

                HttpPost post = new HttpPost(url + load);
                HttpEntity entity = MultipartEntityBuilder.create()
                        .addBinaryBody("q", new byte[]{})
                        .addTextBody("to", String.valueOf(i))
                        .addTextBody("_post", message, ContentType.TEXT_HTML).build();
                post.setEntity(entity);
                try (CloseableHttpResponse response = client.execute(post)) {
                    HttpEntity responseEntity = response.getEntity();
                    entityString = IOUtils.toString(responseEntity.getContent(), "Windows-1251");
                    writeFile(entityString, stage);
                    EntityUtils.consume(responseEntity);
                    EntityUtils.consume(entity);
                    counter++;
                    if (counter % 100 == 0) System.out.println(counter + "/" + idSet.size());
                    spamSet.add(i);
                    //if (counter > 10000)break;
                } catch (Exception e) {
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            writeFile(spamSet.toString(), SPAMMED_ID_SET);
        }
        return entityString != null ? entityString : "";

    }

    private List<BasicNameValuePair> loginLoad() {
        List<BasicNameValuePair> loginLoad = new ArrayList<>();
        loginLoad.add(new BasicNameValuePair("referer", "https://www.yoursex.ru/"));
        loginLoad.add(new BasicNameValuePair("UserName", userName));
        loginLoad.add(new BasicNameValuePair("PassWord", password));
        loginLoad.add(new BasicNameValuePair("CookieDate", "1"));
        return loginLoad;
    }

    private List<BasicNameValuePair> idLoad(String key, String value) {

        Map<String, String> map = new HashMap<>();
        map.put("act", "xmlout");
        map.put("do", "load-anks-search");
        map.put("anks", "24");
        map.put("want", "1");
        map.put("af", "18");
        map.put("at", "50");
        map.put("city_id", "-4962");
        map.put("for", "0");
        map.put("some_city", "");
        map.put("sponsor", "");
        map.put("some_sex", "");
        map.put("some_age", "1");
        map.put("order_asc", "");
        map.put("has_ad", "");
        map.put("has_avatar", "");
        map.put("has_sig", "");
        map.put("has_want", "");
        if (key != null && value != null) {
            map.put(key, value);
        }
        List<BasicNameValuePair> idLoad = new ArrayList<>();
        map.forEach((k, v) -> idLoad.add(new BasicNameValuePair(k, v)));
        return idLoad;
    }

    private List<BasicNameValuePair> getParams(String params) {
        return Arrays.stream(params.split("&"))
                .map(s -> s.split("=")).map(s -> new BasicNameValuePair(s[0], s[1])).collect(Collectors.toList());
    }

    private void writeFile(String response, Stages fileName) throws Exception {
        Files.write(Paths.get(fileName.toString()), response.getBytes(Charset.forName("Windows-1251")), StandardOpenOption.CREATE);

    }

    private void extractMyId(String response) {
        Pattern pat = Pattern.compile("id\\d{4,}");
        Matcher mat = pat.matcher(response);
        if (mat.find()) {
            myID = mat.group();
        }
    }

    private void extractIDs(String response, boolean isFirstBatch, boolean isMyId) {
        if (isFirstBatch) {
            response = response.substring(response.indexOf("'single_ank'"));
        }
        Pattern pat = Pattern.compile("id\\d{4,}");
        Matcher matcher = pat.matcher(response);
        while (matcher.find()) {
            if (isMyId) {
                myID = matcher.group();
                return;
            } else {
                idSet.add(Integer.parseInt(matcher.group().replace("id", "")));
            }
        }
    }

    enum Stages {
        HOME("https://www.yoursex.ru/index.php"),
        LOGIN_PAGE("https://www.yoursex.ru/index.php?act=Login&CODE=00"),
        LOGIN_USER("https://www.yoursex.ru/index.php?act=Login&CODE=01"),
        LOGGED_IN("https://www.yoursex.ru/index.php?&CODE=00"),
        ID_LIST("https://www.yoursex.ru/znakomstva.html"),
        FIRST_BATCH_ID_LIST("https://www.yoursex.ru/znakomstva.html"),
        MESSAGES("https://www.yoursex.ru/messages.html"),
        SEND_MESSAGE("https://www.yoursex.ru/index.php"),
        ID_SET(""),
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
