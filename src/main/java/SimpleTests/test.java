package SimpleTests;

import java.util.Arrays;
import java.util.stream.Collectors;

public class test {
    public static void main(String[] args) {
        String s = "Host: www.4club.com\n" +
                "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0\n" +
                "Accept: application/json, text/javascript, */*; q=0.01\n" +
                "Accept-Language: en-GB,en;q=0.5\n" +
                "Accept-Encoding: gzip, deflate, br\n" +
                "Referer: https://www.4club.com/\n" +
                "Content-Type: application/x-www-form-urlencoded; charset=UTF-8\n" +
                "X-Requested-With: XMLHttpRequest\n" +
                "Content-Length: 115\n" +
                "DNT: 1\n" +
                "Connection: keep-alive\n" +
                "Cookie: PHPSESSID=2l6l7u7sdifqbk883k7tv4lo82\n" +
                "Pragma: no-cache\n" +
                "Cache-Control: no-cache";
        String b = Arrays.stream(s.split("\\n")).map(ss -> "\"" + ss + "\"").collect(Collectors.joining(","));
        System.out.println(b);
    }
}
