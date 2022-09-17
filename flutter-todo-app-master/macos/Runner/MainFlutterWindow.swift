import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {

  // override to load the MainMenu.xib file
  override func awakeFromNib() {
    // create view controller for this window
    let flutterViewController = FlutterViewController.init()
    // get the grame of this window
    let windowFrame = self.frame

    // set this window's view controller and frame to the objects created
    // above
    self.contentViewController = flutterViewController
    self.setFrame(windowFrame, display: true)

    RegisterGeneratedPlugins(registry: flutterViewController)

    // run the original awakeFromNib
    super.awakeFromNib()
  }
}
