package MainPackage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.*;

public class Helpers {
    private static boolean printHeaders = false;
    private static boolean writeFile = false;
    private static boolean apacheLogs = false;

    static {
        if (apacheLogs) {
            System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.SimpleLog");
            System.setProperty("org.apache.commons.logging.simplelog.showdatetime", "true");
            System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.wire", "DEBUG");
        }
    }

    protected String requestPost(String url, Enum stage, List<BasicNameValuePair> params, CloseableHttpClient client, String encoding, Header... headers) throws Exception {
        HttpPost httpPost = new HttpPost(url);
        String entityString;
        if (headers != null) {
            for (Header h : headers) {
                httpPost.removeHeaders(h.getName());
            }
            httpPost.setHeaders(headers);
        }
        httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
        if (printHeaders) _printHeaders(httpPost.getAllHeaders(), stage, true);
        try (CloseableHttpResponse response = client.execute(httpPost)) {
            HttpEntity entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            _writeFile(entityString, stage, encoding);
            if (printHeaders) _printHeaders(response.getAllHeaders(), stage, false);
            EntityUtils.consume(entity);
            httpPost.releaseConnection();
        }
        return entityString;
    }


    protected JsonObject _postWithJson(String url, Enum stage, List<BasicNameValuePair> params, CloseableHttpClient client, Header... headers) throws Exception {
        try {
            return _getJsonMap(requestPost(url, stage, params, client, "UTF-8", headers));
        } catch (Exception e) {
            return null;
        }
    }

    protected String requestGet(String url, Enum stage, CloseableHttpClient client, String encoding) throws Exception {
        String entityString;
        HttpGet httpGet = new HttpGet(url);
        if (printHeaders) _printHeaders(httpGet.getAllHeaders(), stage, true);

        try (CloseableHttpResponse response = client.execute(httpGet)) {
            HttpEntity entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            if (printHeaders) _printHeaders(response.getAllHeaders(), stage, false);
            _writeFile(entityString, stage, encoding);
            EntityUtils.consume(entity);
            httpGet.releaseConnection();
        }
        return entityString;
    }

    /**
     * With default UTF-8 Encoding
     *
     * @param url
     * @param stage
     * @param client
     * @return
     * @throws Exception
     */
    protected String requestGet(String url, Enum stage, CloseableHttpClient client) throws Exception {
        return requestGet(url, stage, client, "UTF-8");
    }

    protected JsonObject _getWithJson(String url, Enum stage, CloseableHttpClient client) throws Exception {
        return _getJsonMap(requestGet(url, stage, client, "UTF-8"));
    }

    static JsonObject _getJsonMap(String json) {
        return new Gson().fromJson(json, JsonObject.class);
    }

    static void _writeFile(String response, Enum fileName, String encoding) throws Exception {
        Path path = Paths.get(String.format("%s/logs/%s", System.getProperty("user.dir"), fileName.getDeclaringClass().getName().split("\\.")[1].replace("$", "")));
        Files.createDirectories(path);
        path = Paths.get(path + "/" + fileName.toString());
        Files.write(path, response.getBytes(Charset.forName(encoding)), StandardOpenOption.CREATE);

    }

    static void _setPrintHeaders(boolean b) {
        printHeaders = b;
    }

    static void setWriteFile(boolean b) {
        writeFile = b;
    }

    static BasicHeader[] _toHeader(String... strings) {
        BasicHeader[] headers = Arrays.stream(strings).map(s -> s.split(":")).map(s -> new BasicHeader(s[0], s[1])).toArray(size -> new BasicHeader[size]);
        return headers;
    }

    static void _printHeaders(Header[] headers, Enum e, boolean isRequest) {
        System.out.println(e.name() + (isRequest ? " REQUEST" : " RESPONSE"));
        Arrays.stream(headers).forEach(h -> System.out.println(h.getName() + ":" + h.getValue()));
        System.out.println("--------------------------------");
    }

    static String _getFromDocs(String filename) {
        return Paths.get(Paths.get("").toAbsolutePath().toString() + "\\src\\main\\java\\Docs\\" + filename).toString();
    }

    static void _setApacheLogs(boolean isEnabled) {
        if (isEnabled) {
            System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.SimpleLog");
            System.setProperty("org.apache.commons.logging.simplelog.showdatetime", "true");
            //System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.client", "DEBUG");
            System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.wire", "ERROR");
            System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http", "DEBUG");

            //System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.impl.conn","DEBUG");
            //System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.impl.client","DEBUG");
            //System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.client","DEBUG");
        }
    }

    static String randomiseLogin(String phoneNumber) {
        int pos = (int) ((Math.random() * (8 - 3)) + 3);
        return phoneNumber.substring(0, pos) + RandomStringUtils.randomAlphabetic(2) + phoneNumber.substring(pos);
    }

    static String getRandomEmail() {
        return RandomStringUtils.randomAlphanumeric(13) + "@mail.ru";
    }
}
