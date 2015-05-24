Baymax.service("DB", function ($webSql, Util,$q, VERSION) {

    //初始化db

    var db = $webSql.openDatabase('baymax_db', '1.0', 'baymax DB', 10 * 1024 * 1024);


    //检测是否需要更新
    var version = Util.getLg("data_version");

    var createTB = function () {
        var defer = $q.defer();
        db.dropTable("message")
            //删message
            .then(function(){
                return db.createTable('message', {
                    "id": {
                        "type": "INTEGER",
                        "null": "NOT NULL",
                        "primary": true,
                        "auto_increment": true
                    },
                    "msgId": {
                        "type": "INTEGER"
                    },
                    "messageType" : {
                        "type": "TEXT"
                    },
                    "conversationId" : {
                        "type": "INTEGER"
                    },
                    "csMsgSendType": {
                        "type": "TEXT"
                    },
                    "msgSendTime": {
                        "type": "DATE"
                    },
                    "msgContent": {
                        "type": "TEXT"
                    },
                    "sendUserId": {
                        "type": "INTEGER"
                    },
                    "senderInfo" :{
                        "type" : "TEXT"
                    },
                    "img" :{
                        "type" : "TEXT"
                    },
                    "voice" :{
                        "type" : "TEXT"
                    }
                })
            })
            //创建message
            .then(function(){
                defer.resolve(1)
            },function(err){
                defer.reject(err);
            });

        return defer.promise;
    }


    var TableName = {
        "message" : "message"
    }


    //检测版本 初始化
    if (version != VERSION.DATA_BASE) {
        createTB()
            .then(function(){
                console.log("db 创建完成...");
                Util.setLg("data_version",VERSION.DATA_BASE);


            },function(err){
                console.log("中断..");
                console.log(err);
            });

    }
    else {
        console.log("使用现有的db");

    }


    //新增一条消息
    var insertMessage = function(msg){
        var obj = {
            "msgId": msg.msgId,
            "csMsgSendType": msg.csMsgSendType,
            "messageType"  : msg.messageType,
            "msgSendTime": msg.msgSendTime,
            "msgContent": msg.msgContent,
            "sendUserId": msg.sendUserId,
            "senderInfo" : JSON.stringify(msg.senderInfo),
            "img" : JSON.stringify(msg.img) || "",
            "voice" :JSON.stringify(msg.voice) ||"",
            "conversationId" : msg.conversationId || ""
        }
        return db.insert(TableName.message,obj)
    }


    //删除一条消息
    var deleteMessage = function(id){
       return  db.del(TableName.message, {"id": id})
    }

    //查询消息
    var selectMessage = function(){
         db.select(TableName.message, {
            "age": {
                "value":'IS NULL',
                "union":'AND'
            },
            "username":'IS NOT NULL'
        }).then(function(results) {
            $scope.users = [];
            for(i=0; i < results.rows.length; i++){
                $scope.users.push(results.rows.item(i));
            }
        })
    }



    //暴露出去的方法
    return {
        insertMessage : insertMessage,
        deleteMessage : deleteMessage,
        selectMessage : selectMessage
    }
});