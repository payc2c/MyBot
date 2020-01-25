import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class test {

    public static void main(String... args) {
        try (Stream<String> lines = Files.lines(Paths.get("C:\\Users\\gg\\IdeaProjects\\MyBot\\logs\\FourClubStages\\ONLINE_LIST.json"))) {
            String json = lines.collect(Collectors.joining());
            JsonObject jsonObject = new Gson().fromJson(json, JsonObject.class);
            List<LinkedTreeMap> list = new Gson().fromJson(jsonObject.get("users"), ArrayList.class);
            System.out.println(list.size());
            System.out.println(list.get(1).get("userid"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}