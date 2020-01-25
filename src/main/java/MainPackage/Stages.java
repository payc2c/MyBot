package MainPackage;

public class Stages {
    enum FOUR_CLUB {

        HOME("https://www.4club.com"),
        REGISTER("https://www.4club.com/register"),
        LOGIN("https://www.4club.com/login"),
        SET_PROFILE("https://www.4club.com/myprofile/save"),
        MY_PROFILE("https://www.4club.com/myprofile"),
        PHOTO("https://www.4club.com/popup/uploadmedia/photo"),
        ONLINE_LIST("https://www.4club.com/search/result/online"),
        UPLOAD_PHOTO("https://www.4club.com/media/uploadphoto"),
        MESSAGES("https://www.yoursex.ru/messages.html"),
        SEND_MESSAGE("https://www.4club.com/message/send"),
        NEW_FACES("https://www.4club.com/search/result/newfaces");

        private String URL;

        FOUR_CLUB(final String URL) {
            this.URL = URL;
        }

        public String getURL() {
            return URL;
        }

        @Override
        public String toString() {
            return this.name() + ".html";
        }
    }
}
