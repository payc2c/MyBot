import com.google.gson.Gson;
import org.apache.http.message.BasicNameValuePair;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class test {
    void test1() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("C:\\Users\\Zim\\IdeaProjects\\AnotherBot\\src\\main\\java\\RegisterData.json")));
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
        list.forEach(System.out::println);
    }

    public static void main(String[] args) throws Exception {
    }


}
