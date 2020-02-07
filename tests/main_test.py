import os, sys, pathlib, logging
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from sys import platform

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
path = pathlib.Path(__file__).parent.absolute()
ffPlatform = {
    "darwin": "/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox-bin",
    "linux": "/mnt/c/Program Files/Firefox Developer Edition/firefox.exe",
    "linux2": "/mnt/c/Program Files/Firefox Developer Edition/firefox.exe",
    "win32": "C:\\Program Files\\Firefox Developer Edition\\firefox.exe",
}
gdPlatform = {
    "darwin": "/usr/bin/geckodriver",
    "linux": "/mnt/c/Program Files/Firefox Developer Edition/geckodriver.exe",
    "linux2": "/mnt/c/Program Files/Firefox Developer Edition/geckodriver.exe",
    "win32": "C:\\Program Files\\Firefox Developer Edition\\geckodriver.exe",
}
tmpPlatform = {"win32": "C:\\Users\\ayoul3\\AppData\\Local\\Temp\\"}


def loadBrowser(ffBinary, geckodriver, extensionPath):
    try:
        options = Options()
        # options.set_headless(headless=True)
        options.binary = ffBinary
        driver = webdriver.Firefox(options=options, executable_path=geckodriver,)
        driver.install_addon(extensionPath, temporary=True)
        return driver
    except Exception as err:
        logger.warning("Error starting FF driver: {0}".format(err))
        sys.exit(-1)


if __name__ == "__main__":
    ffBinary = ffPlatform.get(platform, "")
    geckoDriver = gdPlatform.get(platform, "")
    extensionPath = "%sanonbrowser.xpi" % tmpPlatform.get(platform, "/tmp/")
    testFile = "http://127.0.0.1:9999/test.html"

    listProperties = ["ua", "buildID", "productSub"]
    driver = loadBrowser(ffBinary, geckoDriver, extensionPath)
    try:
        driver.get(testFile)
        for element in listProperties:
            value1 = driver.find_element_by_id("%s1" % element).text
            value2 = driver.find_element_by_id("%s2" % element).text
            assert value1 != value2, "%s is not random" % element

        navigatorKeys = driver.find_element_by_id("navigator").text
        assert ",A," in navigatorKeys, "navigator does not have random properties"

        print("Everything alright")
    except Exception as err:
        logger.warning(err)
    finally:
        driver.quit()
