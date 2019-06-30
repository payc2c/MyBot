package MainPackage;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    private static final String[] INITIAL_HEADERS = {"Connection: keep-alive", "Upgrade-Insecure-Requests: 1", "User-Agent: Mozilla/5.0",
            "Accept: text/html"};
    private static Set<String> HEADERS = new HashSet<>();
    private String userName;
    private String password;
    private static String PAYLOAD;



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

    private String postRequest(String url, String payLoad, String stage) throws Exception {
        String responseString;
        payLoad = URLEncoder.encode(payLoad, "UTF-8").replaceAll("%3D", "\\=");
        URL obj = new URL(url);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        //add request header
        con.setRequestMethod("POST");
        setHeaders(con);
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        System.out.println(getRequestProps(con));

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(payLoad);
        wr.flush();
        wr.close();
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + payLoad);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        responseString = response.toString();
        //System.out.println(getHeaderString(con));
        writeFile(responseString, stage);

        return responseString;

    }

    private String getRequest(String url, String stage) throws Exception {

        String respString;
        URL obj = new URL(url);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        setHeaders(con);
        System.out.println(getRequestProps(con));
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);
        getCookies(con);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine + "\n");
        }
        in.close();
        respString = response.toString();
        writeFile(respString, stage);
        return respString;
    }

    private void setHeaders(HttpsURLConnection con) {
        HEADERS.stream().map(s -> s.split(":")).forEach(s -> con.setRequestProperty(s[0], s[1].trim()));
    }

    private void getCookies(HttpsURLConnection con) {
        List<String> cookie = con.getHeaderFields().get("Set-Cookie");
        HEADERS.addAll(cookie.stream().map(s -> "Cookie: " + s).collect(Collectors.toList()));
        System.out.println("HORSE");
        HEADERS.forEach(System.out::println);
    }

    private void writeFile(String response, String fileName) throws Exception {
        Files.write(Paths.get(fileName), response.getBytes(), StandardOpenOption.CREATE);

    }

    private String getRequestProps(HttpsURLConnection con) {
        StringBuffer buffer = new StringBuffer();
        con.getRequestProperties().forEach((k, v) -> {
            buffer.append(k + ": ");
            v.forEach(s -> buffer.append(s));
            buffer.append("\n");
        });
        return buffer.toString();
    }

    private String getHeaderString(HttpsURLConnection con) {
        StringBuffer buffer = new StringBuffer();
        con.getHeaderFields().forEach((k, v) -> {
            buffer.append(k + ": ");
            v.forEach(s -> buffer.append(s));
            buffer.append("\n");
        });
        return buffer.toString();
    }

    private void readAndFindInFile(String fileName) throws Exception {
        try (Stream<String> string = Files.lines(Paths.get(fileName))) {
        }
    }

    public void run() throws Exception {
        String response;
        String queryParam;
        String payLoad;
        HEADERS.addAll(Arrays.asList(INITIAL_HEADERS));
        getRequest(Stages.HOME.getURL(), Stages.HOME.toString());
        HEADERS.add("Referer: https://www.yoursex.ru/");
        Thread.sleep(3000);
       /* m.getRequest(Stages.LOGIN_PAGE.getURL(), Stages.LOGIN_PAGE.toString());
        Thread.sleep(3000);*/
        HEADERS.add("Origin: https://www.yoursex.ru");
        payLoad = "referer=https%3A%2F%2Fwww.yoursex.ru%2F&UserName=lira98&PassWord=rambler&CookieDate=1";
        postRequest(Stages.LOGIN_USER.getURL(), payLoad, Stages.LOGIN_USER.toString());
        Thread.sleep(300);
        response = getRequest(Stages.LOGGED_IN.getURL(), Stages.LOGGED_IN.toString());
        if (response.contains("<div id=\"userlinks\">") && response.contains(userName)) {
            System.out.println("LOGIN SUCCESSFUL");
        } else System.out.println("FAILURE");
        Thread.sleep(1000);
        queryParam = "?want=1&af=18&at=50&some_age=1&city_id=city-4400&for=0";
        getRequest(Stages.ID_LIST.getURL() + queryParam, "FirstBatch" + Stages.ID_LIST.toString());
        Thread.sleep(1000);
        payLoad = "act=xmlout&do=load-anks-search&anks=24&want=1&af=18&at=50&city_id=city-4400&for=0&some_city=&sponsor=&some_sex=&some_age=1&order_asc=&has_ad=&has_avatar=&has_sig=&has_want=&";
        queryParam = "s=&act=xmlout&do=load-anks-search&anks=24&want=1&af=18&at=50&city_id=city-4400&for=0&some_city=&sponsor=&some_sex=&some_age=1&order_asc=&has_ad=&has_avatar=&has_sig=&has_want=";
        postRequest(Stages.HOME.getURL(), payLoad, Stages.ID_LIST.toString());


    }


    public static void main(String[] args) throws Exception {
        String username = "adgszc@smart-mail.info";
        String password = "123123123gf";
        NewHttpClient client = new NewHttpClient(username, password);
        client.run();

    }
}