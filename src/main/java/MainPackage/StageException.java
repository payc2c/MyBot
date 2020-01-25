package MainPackage;

public class StageException extends Exception {
    private String message;
    private Throwable cause;
    private Enum stage;

    public StageException(String message, Throwable cause, Enum stage){
        this.message = message;
        this.cause = cause;
        this.stage = stage;
    }

    public StageException(String message, Enum stage){
        this.message = message;
        this.stage = stage;
    }
}
