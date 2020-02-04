package MainPackage;

import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

public class StageException extends Exception {
    private String message;
    private Throwable cause;
    private Enum stage;
    private Account account;

    public StageException(String message, Throwable cause, Enum stage, Account account) {
        this.message = message;
        this.cause = cause;
        this.stage = stage;
        this.account = account;
    }

    public StageException(String message, Enum stage, Account account) {
        this.message = message;
        this.account = account;
        this.stage = stage;
    }

    public StageException writeLogs() throws Exception {
        List<Path> pathList = new ArrayList<>();
        int count = 0;
        Path path = Paths.get(String.format("%s/logs/Exceptions", System.getProperty("user.dir")));
        if (!Files.isDirectory(path))
            Files.createDirectories(path);
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
            stream.forEach(pathList::add);
        } catch (Exception e) {
            System.err.println("Failed to get the list of error files");
            e.printStackTrace();
        }
        if (pathList.stream().anyMatch(p -> Files.isRegularFile(p))) {
            count = pathList.stream()
                    .map(p -> p.getFileName().toString().split("_")[2].split("\\.")[0])
                    .mapToInt(Integer::parseInt).max().getAsInt();

        }
        path = Paths.get(String.format("%s/LogNo_%s_%d_%s.txt", path, stage.name(), (count + 1),
                account.getLogin() != null ? account.getLogin() : account.getEmail()));
        try {
            Files.writeString(path, message, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (Exception e) {
            System.err.println("Failed to write error file");
            e.printStackTrace();
        }
        return this;

    }
}
