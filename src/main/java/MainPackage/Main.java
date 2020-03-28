package MainPackage;

import org.apache.commons.lang3.RandomStringUtils;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

public class Main extends Helpers {
    private static final String cities = " Moscow|187219|1\n" +
            "Sankt-Peterburg|100787|66\n" +
            "Novosibirsk|495117|53\n" +
            "Yekaterinburg|463211|71\n" +
            "Novgorod|168511|52\n" +
            "Samara|101664|65\n" +
            "Omsk|492924|54\n" +
            "Kazan|272141|73\n" +
            "Chelyabinsk|532314|13\n" +
            "Rostov-na-Donu|108520|61\n" +
            "Ufa|852336|90\n" +
            "Volgograd|27848|84\n" +
            "Perm’|141178|90\n" +
            "Krasnoyarsk|512514|91\n" +
            "Voronezh|26161|86\n" +
            "Saratov|100297|67\n" +
            "Krasnodar|243292|38\n" +
            "Tolyatti|49617|65\n" +
            "Vladivostok|565470|59";

    private AtomicLong counter = new AtomicLong(0);

    private synchronized boolean runParallel(boolean fromFile, int threads, String phone, int delay) {
        int maxThreads = 20;
        List<Future> futures = new ArrayList<>();
        List<Account> accounts = new ArrayList<>();
        List<Account> accountsInUse = new ArrayList<>();
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailList" + phone + ".txt");
        List<City> cities = Arrays.stream(this.cities.split("\\n")).map(c -> c.split("\\|"))
                .map(c -> new City(c[0], c[1], c[2])).collect(Collectors.toList());

        if (fromFile) {
            if (Files.notExists(path)) registerAccsParallel(20, phone);
            try {
                accounts = Files.readAllLines(path).stream().map(s -> s.split(":"))
                        .map(s -> new Account(s[0], s[1])).collect(Collectors.toList());
                if (accounts.size() < threads) {
                    registerAccsParallel(threads - accounts.size() + 1, phone);
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        ExecutorService taskExecutor = Executors.newFixedThreadPool(threads > maxThreads ? maxThreads : threads);
        CompletionService<Account> taskCompletionService = new ExecutorCompletionService<>(taskExecutor);
        try {
            for (int i = 0; i < threads; i++) {
                Account ac = accounts.get(0);
                makeCallableForRunning(taskCompletionService, ac.setCity(cities.get(i)), delay);
                accountsInUse.add(ac);
                accounts.remove(ac);
            }
            while (!taskExecutor.isTerminated()) {
                Future<Account> future = taskCompletionService.take();
                futures.add(future);
                Account account = future.get();
                if (account.hasError()) {
                    accountsInUse.remove(account);
                    account = accounts.size() > 0 ? accounts.get(0).setCity(account.getCity()) :
                            registerAccs(1, phone).get(0).setCity(account.getCity());
                    accounts.remove(account);
                    accountsInUse.add(account);
                    makeCallableForRunning(taskCompletionService, account, delay);
                    continue;
                }
                if (!account.hasError()) {
                    accountsInUse.remove(account);

                    accounts.add(account);
                    if (accountsInUse.isEmpty()) {
                        taskExecutor.shutdown();
                        break;
                    }
                    continue;
                }
            }
            taskExecutor.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            taskExecutor.shutdownNow();
            writeList(accounts, path);
            System.out.println(counter.get() + "___________Accs Spammed");
        }
        return true;
    }

    protected synchronized List<Account> registerAccsParallel(int accNum, String phoneLogin) {
        int maxThreads = 20;
        List<Account> list = new ArrayList<>();
        List<Callable<Account>> tasks = new ArrayList<>();
        Path path = Paths.get(String.format("%s/logs/Emails", System.getProperty("user.dir")));
        path = Paths.get(path + "/" + "EmailList" + phoneLogin + ".txt");
        ExecutorService taskExecutor = Executors.newFixedThreadPool(accNum > maxThreads ? maxThreads : accNum);
        CompletionService<Account> taskCompletionService = new ExecutorCompletionService<>(taskExecutor);
        try {

            for (int i = 0; i < accNum; i++) {
                submitCallableForRegistration(taskCompletionService, phoneLogin);
                Thread.sleep(500);
            }
            while (!taskExecutor.isTerminated()) {
                Account account = taskCompletionService.take().get();
                if (account == null || account.isNull()) {
                    submitCallableForRegistration(taskCompletionService, phoneLogin);
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

    private List<Account> registerAccs(int accNum, String phoneLogin) {
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

    private void makeCallableForRunning(CompletionService<Account> completionService, Account account, int delay) {
        Callable<Account> callable = () -> {
            FourClub club = new FourClub(account);
            return club.run(counter, delay);
        };
        completionService.submit(callable);
    }

    private void submitCallableForRegistration(CompletionService<Account> completionService, String phoneLogin) {
        String password = RandomStringUtils.randomAlphanumeric(10);
        Callable<Account> callable = () -> {
            FourClub club = new FourClub(new Account(Helpers.getRandomEmail(), password, phoneLogin));
            Thread.sleep(1000);
            return club.regiserAcc();
        };

        completionService.submit(callable);
    }

    private synchronized Account checkNullAndWrite(Account account, Path path) throws Exception {
        if (account != null && account.isNotNull()) {
            if (!Files.exists(path.getParent())) Files.createDirectories(path.getParent());
            Files.write(path, (account.getEmail() + ":" + account.getPassword() + "\n").getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            return account;
        }
        return null;
    }

    private void writeList(List<Account> list, Path path) {
        try {
            if (!Files.exists(path.getParent())) Files.createDirectories(path.getParent());
            Files.write(path, list.stream().map(account -> account.getEmail() + ":"
                            + account.getPassword()).collect(Collectors.joining("\n")).getBytes(),
                    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static synchronized void main(String[] args) throws Exception {
        //Illya 9774020155
        //Andrey 9774020160
        AtomicLong counter = new AtomicLong(0);
        String phoneLogin = "9774020155";
        String username = "yolicex@click-email.com";
        Main main = new Main();
     /*   YourSex yoursex = new YourSex(username, password);
        yoursex.run();*/
        long time = System.currentTimeMillis();
        FourClub four = new FourClub(new Account("KsNajnDHdQCzZ@mail.ru", "FE6NatbWbP"));
        //main.registerAccsParallel(200, phoneLogin);
        int c = 0;
        while (true) {
            while (!main.runParallel(true, 19, "9774020155", 1750)) ;
            System.out.println("Spamming try n " + (c++));
            Thread.sleep(60 * 1000);
        }
    }
}