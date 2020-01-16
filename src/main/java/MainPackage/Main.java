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
                makeCallable(taskCompletionService, phoneLogin);
            }
            while (!taskExecutor.isTerminated()) {
                Future<Account> future = taskCompletionService.take();
                Account account = future.get();
                if (account == null || account.isNull()) {
                    makeCallable(taskCompletionService, phoneLogin);
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

    private void makeCallable(CompletionService<Account> completionService, String phoneLogin) {
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
        String phoneLogin = "5774020155";
        String username = "yolicex@click-email.com";
        Main main = new Main();
     /*   YourSex yoursex = new YourSex(username, password);
        yoursex.run();*/
        long time = System.currentTimeMillis();
        List<Account> list = main.registerAccsParallel(100, phoneLogin);
        System.out.println("SUPER SUC !!!!! _________________________________________________" + (System.currentTimeMillis() - time));

    }
}