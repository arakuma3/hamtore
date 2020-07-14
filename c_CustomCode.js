function insertlog_test(){
  insertLog_('test','Info','aaaaaaaaabbbccc','memo');
}

function insertLog_(func,level,message,memo) {
  var lock = LockService.getScriptLock()
  if (lock.tryLock(10000)) {
    try {
      var sheet = spreadSheet.getSheetByName('log');
      var now = new Date();
      var time = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
      sheet.appendRow([time, func, level, message, memo])

    }catch(e){
      sendMessage_(e);
    }finally{
      lock.releaseLock();
    }
  }else{
    sendMessage_("write retry failed because of lock.");
  }
}
