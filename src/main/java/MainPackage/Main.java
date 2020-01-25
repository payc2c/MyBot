package MainPackage;

import org.apache.commons.lang3.RandomStringUtils;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.stream.Collectors;

public class Main extends Helpers {
    private static final String cities = " Moscow|187219|\n" +
            "(Sankt-Peterburg)|100787|66\n" +
            "Novosibirsk (Novosibirsk)|495117|53\n" +
            "Yekaterinburg (Sverdlovsk)|463211|71\n" +
            "Novgorod (Novgorod)|168511|52\n" +
            "Samara (Samara)|101664|65\n" +
            "Omsk (Omsk)|492924|54\n" +
            "Kazan (Tatarstan)|272141|73\n" +
            "Chelyabinsk (Tsjeljabinsk)|532314|13\n" +
            "Rostov-na-Donu (Rostov)|108520|61\n" +
            "Ufa (Perm)|852336|90\n" +
            "Volgograd (Volgograd)|27848|84\n" +
            "Perm’ (Perm)|141178|90\n" +
            "Krasnoyarsk (Krasnoyarskiy)|512514|91\n" +
            "Voronezh (Voronezj)|26161|86\n" +
            "Saratov (Saratov)|100297|67\n" +
            "Krasnodar (Krasnodarskiy)|243292|38\n" +
            "Tolyatti (Samara)|49617|65\n" +
            "Vladivostok (Primorskiy)|565470|59\n" +
            "Russian Federation|855784|00";

    private void runParallel(boolean fromFile, int threads, String phone) {
        if (fromFile) {

        }

        int maxThreads = 20;
        List<Callable<Account>> tasks = new ArrayList<>();
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailList" + phone + ".txt");

        ExecutorService taskExecutor = Executors.newFixedThreadPool(threads > maxThreads ? maxThreads : threads);
        CompletionService<Account> taskCompletionService = new ExecutorCompletionService<>(taskExecutor);
        try {
            List<Account> list = Files.readAllLines(path).stream().map(s -> s.split(":")).map(s -> new Account(s[0], s[1])).collect(Collectors.toList());
            for (int i = 0; i < threads; i++) {
                makeCallableForRunning(taskCompletionService, list.get(i));
            }
            while (!taskExecutor.isTerminated()) {
                Account account = taskCompletionService.take().get();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private synchronized List<Account> registerAccsParallel(int accNum, String phoneLogin) {
        int maxThreads = 20;
        List<Account> list = new ArrayList<>();
        List<Callable<Account>> tasks = new ArrayList<>();
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailList" + phoneLogin + ".txt");
        ExecutorService taskExecutor = Executors.newFixedThreadPool(accNum > maxThreads ? maxThreads : accNum);
        CompletionService<Account> taskCompletionService = new ExecutorCompletionService<>(taskExecutor);
        try {

            for (int i = 0; i < accNum; i++) {
                makeCallableForRegistration(taskCompletionService, phoneLogin);
            }
            while (!taskExecutor.isTerminated()) {
                Account account = taskCompletionService.take().get();
                if (account == null || account.isNull()) {
                    makeCallableForRegistration(taskCompletionService, phoneLogin);
                    continue;
                }
                list.add(checkNullAndWrite(account, path));
                if (list.size() % 10 == 0) System.out.println(list.size());
                if (list.size() == accNum) break;
            }
            path = Paths.get(path.getParent() + "/" + "EmailListNewPara.txt");
            writeList(list, path);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            taskExecutor.shutdownNow();
            writeList(list, path);
            return list;
        }
    }

    private List<Account> regiserAccs(int accNum, String phoneLogin) {
        List<Account> list = new ArrayList<>();
        try {
            Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
            path = Paths.get(path + "/" + "EmailList" + phoneLogin + ".txt");

            for (int i = 0; i < accNum; i++) {

                String password = RandomStringUtils.randomAlphanumeric(10);
                FourClub club = new FourClub(new Account(Helpers.getRandomEmail(), password, phoneLogin));
                Account account = club.regiserAcc();
                list.add(checkNullAndWrite(account, path));
                if (i % 10 == 0) System.out.println("SUC emails ........." + i);
            }
            path = Paths.get(path.getParent() + "/" + "EmailListNew.txt");
            writeList(list, path);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    private void makeCallableForRunning(CompletionService<Account> completionService, Account account) {
        Callable<Account> callable = () -> {
            FourClub club = new FourClub(account);
            Thread.sleep(1000);
            return club.run();
        };
    }

    private void makeCallableForRegistration(CompletionService<Account> completionService, String phoneLogin) {
        String password = RandomStringUtils.randomAlphanumeric(10);
        Callable<Account> callable = () -> {
            FourClub club = new FourClub(new Account(Helpers.getRandomEmail(), password, phoneLogin));
            Thread.sleep(1000);
            return club.regiserAcc();
        };

        completionService.submit(callable);
    }

    private synchronized Account checkNullAndWrite(Account account, Path path) throws Exception {
        if (account.isNotNull()) {
            if (!Files.exists(path.getParent())) Files.createDirectories(path.getParent());
            Files.write(path, (account.getEmail() + ":" + account.getPassword() + "\n").getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            return account;
        }
        return null;
    }

    private void writeList(List<Account> list, Path path) {
        try {
            if (!Files.exists(path.getParent())) Files.createDirectories(path.getParent());
            Files.write(path, list.stream().map(account -> account.getEmail() + ":" + account.getPassword()).collect(Collectors.joining("\n")).getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        //Illya 9774933968
        //Andrey 9774020160
        String phoneLogin = "9774020155";
        String username = "yolicex@click-email.com";
        Main main = new Main();
     /*   YourSex yoursex = new YourSex(username, password);
        yoursex.run();*/
        long time = System.currentTimeMillis();
        //main.registerAccsParallel(100, phoneLogin);
        FourClub four = new FourClub(new Account("MfkC1LBtuYPWm@mail.ru", "UsHCt5W07f"));
        four.run();
        System.out.println("SUPER SUC !!!!! _________________________________________________" + (System.currentTimeMillis() - time));

    }
}