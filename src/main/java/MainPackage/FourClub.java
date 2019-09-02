package MainPackage;

import com.google.gson.Gson;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static MainPackage.FourClub.Stages.*;

public class FourClub extends Helpers {
    private static final String[] INITIAL_HEADERS = {"Host: www.4club.com", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0", "Accept: application/json, text/javascript, */*; q=0.01", "Accept-Language: en-GB,en;q=0.5", "Accept-Encoding: gzip, deflate, br", "X-Requested-With: XMLHttpRequest", "Connection: keep-alive", "Pragma: no-cache", "Cache-Control: no-cache"};
    private static List<BasicHeader> HEADERS = new ArrayList<>();
    private String userName;
    private String password;
    private CookieStore cookieStore = new BasicCookieStore();

    public FourClub(String userName, String password) {
        this.userName = userName;
        this.password = password;
        HEADERS.addAll(Arrays.asList(_toHeader(INITIAL_HEADERS)));
    }

    void run() {
        _setPrintHeaders(true);
        _setApacheLogs(true);
        Map<String, Object> response;
        try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultHeaders(HEADERS).setDefaultCookieStore(cookieStore).build()) {
            _get(HOME.getURL(), HOME, httpClient);
            checkSuc(_postWithJson(LOGIN.getURL(), LOGIN, loginLoad(userName, password), httpClient));
            // checkSuc(_postWithJson(REGISTER.getURL(), REGISTER, registerLoad(), httpClient));
            _get(MY_PROFILE.getURL(), MY_PROFILE, httpClient);
            checkSuc(_postWithJson(SET_PROFILE.getURL(), SET_PROFILE, profileLoad(), httpClient));
            _get(PHOTO.getURL(), PHOTO, httpClient);
            //checkSuc(_getJsonMap(postPic(UPLOAD_PHOTO.getURL(), UPLOAD_PHOTO, "1234", httpClient)));
            //_get(REGISTER_REDIR.getURL(), REGISTER_REDIR, httpClient);
            //if (response.get("result").equals(false)) throw new Error(response.get("errors").toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private List<BasicNameValuePair> loginLoad(String userName, String password) {
        List<BasicNameValuePair> load = new ArrayList<>();

        load.add(new BasicNameValuePair("email", userName));
        load.add(new BasicNameValuePair("password", password));
        load.add(new BasicNameValuePair("remember", "false"));
        return load;
    }

    private List<BasicNameValuePair> registerLoad() {
        List<BasicNameValuePair> load = new ArrayList<>();
        load.add(new BasicNameValuePair("sex", "f"));
        load.add(new BasicNameValuePair("email", userName));
        load.add(new BasicNameValuePair("password", password));
        load.add(new BasicNameValuePair("countryCode", "RU"));
        // Moscow
        load.add(new BasicNameValuePair("idCity", "187219"));
        load.add(new BasicNameValuePair("age", "18"));
        load.add(new BasicNameValuePair("sexPreferences[]", "m"));
        return load;
    }

    private void checkSuc(Map<String, Object> response) {
        if ((boolean) response.get("result") == true) System.out.println("SUC");
    }

    /**
     * Not working
     *
     * @param url
     * @param stage
     * @param payload
     * @param client
     * @return
     * @throws Exception
     */
    private String postPic(String url, Stages stage, String payload, CloseableHttpClient client) throws Exception {
        HttpPost post = new HttpPost(url);
        post.removeHeaders("Content-Type");
        post.addHeader("Content-Type", "multipart/form-data");
        String entityString;
        File file = new File("C:\\Users\\Zim\\IdeaProjects\\AnotherBot\\src\\main\\java\\stoya.jpg");
        System.out.println(file.getName());
        String encoding = "UTF-8";
        HttpEntity entity = MultipartEntityBuilder.create().setContentType(ContentType.MULTIPART_FORM_DATA)
                .addTextBody("verified", "0")
                .addBinaryBody("fileUpload", file, ContentType.IMAGE_JPEG, file.getName())
                .addTextBody("description", "")
                .addTextBody("title", payload)
                .build();
        post.setEntity(entity);
        _printHeaders(post.getAllHeaders(), stage);

        try (CloseableHttpResponse response = client.execute(post)) {
            System.out.println(response.getStatusLine());
            entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            _printHeaders(response.getAllHeaders(), stage);
            _writeFile(entityString, stage, encoding);
            EntityUtils.consume(entity);
        }
        return entityString;
    }

    private List<BasicNameValuePair> profileLoad() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("C:\\Users\\Zim\\IdeaProjects\\AnotherBot\\src\\main\\java\\misc.json")));
        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(json, Map.class);
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

    enum Stages {
        HOME("https://www.4club.com"),
        REGISTER_REDIR("https://www.4club" +
                ".com/loging/5cb4eb35337d18917ddabce5ac21a5cf0638a47dc154e0206242e62d3207f8aed0456d231d835d4c2090e2c733c8f3f5843cecf79bddfc38796ab8d2ca3435ca3d343f3c9411d8ca398826cd31e3dd8643b65eb2f9f657bc376b3423f06a108eb5de2a94f8fc1816a060fd63cc0aa848"),
        REGISTER("https://www.4club.com/register"),
        LOGIN("https://www.4club.com/login"),
        SET_PROFILE("https://www.4club.com/myprofile/save"),
        MY_PROFILE("https://www.4club.com/myprofile"),
        PHOTO("https://www.4club.com/popup/uploadmedia/photo"),
        UPLOAD_PHOTO("https://www.4club.com/media/uploadphoto"),
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
