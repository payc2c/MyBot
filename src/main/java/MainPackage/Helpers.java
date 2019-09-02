package MainPackage;

import com.google.gson.Gson;
import org.apache.commons.io.IOUtils;
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
import java.util.Map;

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

    static String _post(String url, Enum stage, List<BasicNameValuePair> params, CloseableHttpClient client, String encoding) throws Exception {
        HttpPost httpPost = new HttpPost(url);
        String entityString;
        httpPost.setEntity(new UrlEncodedFormEntity(params));
        if (printHeaders) _printHeaders(httpPost.getAllHeaders(), stage);
        try (CloseableHttpResponse response = client.execute(httpPost)) {
            //System.out.println(response.getStatusLine());
            HttpEntity entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            if (printHeaders) _printHeaders(response.getAllHeaders(), stage);
            _writeFile(entityString, stage, encoding);
            EntityUtils.consume(entity);
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
    static String _post(String url, Enum stage, List<BasicNameValuePair> params, CloseableHttpClient client) throws Exception {
        return _post(url, stage, params, client, "UTF-8");
    }

    static Map<String, Object> _postWithJson(String url, Enum stage, List<BasicNameValuePair> params, CloseableHttpClient client) throws Exception {
        return _getJsonMap(_post(url, stage, params, client, "UTF-8"));
    }

    static String _get(String url, Enum stage, CloseableHttpClient client, String encoding) throws Exception {
        String entityString;
        HttpGet httpGet = new HttpGet(url);
        if (printHeaders) _printHeaders(httpGet.getAllHeaders(), stage);

        try (CloseableHttpResponse response = client.execute(httpGet)) {
            HttpEntity entity = response.getEntity();
            entityString = IOUtils.toString(entity.getContent(), encoding);
            if (printHeaders) _printHeaders(response.getAllHeaders(), stage);
            _writeFile(entityString, stage, encoding);
            EntityUtils.consume(entity);
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
    static String _get(String url, Enum stage, CloseableHttpClient client) throws Exception {
        return _get(url, stage, client, "UTF-8");
    }

    static Map<String, Object> _getWithJson(String url, Enum stage, CloseableHttpClient client) throws Exception {
        return _getJsonMap(_get(url, stage, client, "UTF-8"));
    }

    static Map<String, Object> _getJsonMap(String json) {
        Gson gson = new Gson();
        return gson.fromJson(json, Map.class);
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

    static void _printHeaders(Header[] headers, Enum e) {
        System.out.println(e.name());
        Arrays.stream(headers).forEach(h -> System.out.println(h.getName() + ":" + h.getValue()));
        System.out.println("--------------------------------");
    }

    static void _setApacheLogs(boolean b) {
        if (b) {
            System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.SimpleLog");
            System.setProperty("org.apache.commons.logging.simplelog.showdatetime", "true");
            // System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.client", "DEBUG");
            System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.wire", "DEBUG");
           /* System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.impl.conn","DEBUG");
            System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.impl.client","DEBUG");
            System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http.client","DEBUG");*/
        }
    }
}
