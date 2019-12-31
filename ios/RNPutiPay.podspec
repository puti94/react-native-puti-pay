require "json"
package = JSON.parse(File.read('../package.json'))

Pod::Spec.new do |s|
  s.name         = 'RNPutiPay'
  s.version      = package['version']
  s.summary      = package['description']
  s.requires_arc = true
  s.license      = "MIT"
  s.homepage     = "https://github.com/puti94/react-native-puti-pay"
  s.source       = { :git => "https://github.com/puti94/react-native-puti-pay", :tag => "master" }
  s.author       = "puti94"
  s.source_files = "**/*.{h,m}"
  s.platform     = :ios, "8.0"

  s.dependency "React"
  s.dependency "AlipaySDK-iOS"
  #s.resource = "AlipaySDK.bundle"
  #s.vendored_frameworks = 'AlipaySDK.framework'
  s.vendored_libraries = "libWeChatSDK.a"
  s.frameworks = "SystemConfiguration", "CoreTelephony", "QuartzCore", "CoreText", "CoreGraphics", "UIKit", "Foundation", "CFNetwork", "CoreMotion"
  s.library = "c++", "z", "sqlite3.0", "sqlite3"

end

