package MainPackage;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpConnection;
import org.apache.http.HttpEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static MainPackage.NewHttpClient.Stages.*;

public class NewHttpClient {
    private static final String[] INITIAL_HEADERS = {"Origin: https://www.yoursex.ru", "Referer: https://www.yoursex.ru/", "Connection: keep-alive", "Upgrade-Insecure-Requests: 1", "User-Agent: Mozilla/5.0",
            "Accept: text/html"};
    private static List<BasicHeader> HEADERS = new ArrayList<>();
    private String userName;
    private String password;
    private String myID;
    private Set<Integer> idSet = new HashSet<>();

    enum Stages {
        HOME("https://www.yoursex.ru/index.php"),
        LOGIN_PAGE("https://www.yoursex.ru/index.php?act=Login&CODE=00"),
        LOGIN_USER("https://www.yoursex.ru/index.php?act=Login&CODE=01"),
        LOGGED_IN("https://www.yoursex.ru/index.php?&CODE=00"),
        ID_LIST("https://www.yoursex.ru/znakomstva.html");

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

    public NewHttpClient(String userName, String password) {
        this.userName = userName;
        this.password = password;
        HEADERS.addAll(Arrays.asList(toHeader(INITIAL_HEADERS)));

    }

    void run() {
        try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultHeaders(HEADERS).build()) {
            String queryParam;
            get(HOME.getURL(), HOME.toString(), httpClient);
            Thread.sleep(500);
            get(LOGIN_PAGE.getURL(), LOGIN_PAGE.toString(), httpClient);
            Thread.sleep(500);
            post(LOGIN_USER.getURL(), LOGIN_USER.toString(), loginLoad(), httpClient);
            Thread.sleep(500);
            String response = get(LOGIN_USER.getURL(), LOGIN_USER.toString(), httpClient);
            if (response.contains("<div id=\"userlinks\">")) {
                System.out.println("SUCCESSFUL");
            } else System.out.println("FAILURE");

            extractIDs(response, false, true);

            System.out.println("HORSE" + myID);
            Thread.sleep(500);
            queryParam = "?want=1&af=18&at=50&some_age=1&city_id=city-4400&for=0";
            response = get(ID_LIST.getURL() + queryParam, "FirstBatch" + ID_LIST.toString(), httpClient);
            extractIDs(response, true, false);
            Thread.sleep(500);
            queryParam = "?want=1&af=18&at=50&some_age=1&city_id=city-4400&for=0";
            response = post(HOME.getURL() + queryParam, ID_LIST.toString(), idLoad("",""), httpClient);
            extractIDs(response, false, false);
            for (int i = 48;i<1000;i=i+24){
                response = post(HOME.getURL() + queryParam, ID_LIST.toString(), idLoad("anks",String.valueOf(i)), httpClient);
                extractIDs(response,false,false);
            }
            System.out.println(idSet.size());
            idSet.forEach(System.out::println);
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    private String get(String url, String stage, CloseableHttpClient httpClient) throws Exception {
        String entityString;
        HttpGet httpGet = new HttpGet(url);
        try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
            System.out.println(response.getStatusLine());
            HttpEntity entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), "Windows-1251");
            System.out.println(response.toString());
            writeFile(entityString, stage);

            EntityUtils.consume(entity);
        }
        return entityString;
    }

    private void sendMessage(HttpConnection connection) {
        HttpPost post = new HttpPost();
    }
    private String post(String url, String stage, List<BasicNameValuePair> params, CloseableHttpClient httpClient) throws Exception {
        HttpPost httpPost = new HttpPost(url);
        String entityString;


        httpPost.setEntity(new UrlEncodedFormEntity(params));

        try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
            System.out.println(response.getStatusLine());
            HttpEntity entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), "Windows-1251");
            System.out.println(response.toString());
            writeFile(entityString, stage);
            EntityUtils.consume(entity);
        }
        return entityString;
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
        map.put("city_id", "-4400");
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
        if (key!=null&&value!=null) {
            map.put(key, value);
        }
        List<BasicNameValuePair> idLoad = new ArrayList<>();
        map.forEach((k, v) -> idLoad.add(new BasicNameValuePair(k, v)));
        return idLoad;
    }

    private BasicHeader[] toHeader(String... strings) {
        BasicHeader[] headers = Arrays.stream(strings).map(s -> s.split(":")).map(s -> new BasicHeader(s[0], s[1])).toArray(size -> new BasicHeader[size]);
        return headers;
    }

    private List<BasicNameValuePair> getParams(String params) {
        return Arrays.stream(params.split("&"))
                .map(s -> s.split("=")).map(s -> new BasicNameValuePair(s[0], s[1])).collect(Collectors.toList());
    }

    private void writeFile(String response, String fileName) throws Exception {
        Files.write(Paths.get(fileName), response.getBytes(Charset.forName("Windows-1251")), StandardOpenOption.CREATE);

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
            response = response.substring(response.indexOf("'single_ank'", 0));
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
}
