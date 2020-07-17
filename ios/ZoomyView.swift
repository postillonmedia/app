//
//  ZoomyView.swift
//  postillon
//
//  Created by Daniel Lang on 08.12.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit
import Zoomy

class ZoomyView: UIView {
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    let b = button
    
    
    
    self.addSubview(b)
  }
  
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  lazy var button: UIButton = {
    let b = UIButton.init(type: UIButton.ButtonType.system)
    
    b.titleLabel?.font = UIFont.systemFont(ofSize: 50)
    b.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    b.setTitle("Button Title", for: .normal)
    
    return b
  }()
  
}
