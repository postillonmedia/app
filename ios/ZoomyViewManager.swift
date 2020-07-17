//
//  ZoomyViewManager.swift
//  postillon
//
//  Created by Daniel Lang on 08.12.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import Zoomy

@objc(ZoomyViewManager)
class ZoomyViewManager: RCTViewManager {
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    
    return ZoomyView()
  }
  
}
