//
//  RCTCardboardModule.m
//  kd
//
//  Created by punkblood on 2021/07/04.
//

#import "RCTCardboardModule.h"

static NSString *const kCardboardDeviceParamsAndTimeKey =
    @"com.google.cardboard.sdk.DeviceParamsAndTime";

@implementation RCTCardboardModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(isCardboadScanQR:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSArray *array = [defaults arrayForKey:kCardboardDeviceParamsAndTimeKey];
  NSData *serializedDeviceParams = array ? array[1] : nil;

  if (serializedDeviceParams) {
    resolve(@(YES));

  } else {
    resolve(@(NO));
  }
}



@end
