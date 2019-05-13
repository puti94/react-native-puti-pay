
Pod::Spec.new do |s|
  s.name         = "RNPutiPay"
  s.version      = "1.0.0"
  s.summary      = "RNPutiPay"
  s.description  = <<-DESC
                  RNPutiPay
                   DESC
  s.homepage     = "https://github.com/puti94/react-native-puti-pay"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNPutiPay.git", :tag => "master" }
  s.source_files  = "RNPutiPay/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  
