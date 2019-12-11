package MainPackage;

import org.apache.commons.lang3.RandomStringUtils;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

public class Main {


    public static void main(String[] args) throws Exception {
        String username = "yolicex@click-email.com";
     /*   YourSex yoursex = new YourSex(username, password);
        yoursex.run();*/
     //Illya 9154255613
        //Andrey 9775410692
        String phoneLogin = "9154255613";
        List<String> list = new ArrayList<>();
        while (list.size() < 300) {
            String password = RandomStringUtils.randomAlphanumeric(10);

            FourClub club = new FourClub(Helpers.getRandomEmail(), password, phoneLogin);
            String email = club.run();
            if (email != null) {
                list.add(email);
                Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
                path = Paths.get(path + "/" + "EmailList" + phoneLogin + ".txt");
                Files.write(path, ("\n" + email + ":" + password).getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            }
            if (list.size() % 10 == 0) System.out.println("SUC emails ........." + list.size());
        }
        System.out.println("SUPER SUC !!!!! _________________________________________________");
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailListNew.txt");
        // Files.write(path, list.stream().map(s -> s + ":" + password).collect(Collectors.joining("\n")).getBytes(), StandardOpenOption.CREATE);
    }
}