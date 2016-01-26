process.stdin.on('data',function(data){
	console.log(process.pid);//进程的pid
	console.log(process.version);//node的版本
	// console.log(process.env);//包含在该进程的环境中指定的键值对。
	// console.log(process.config);//包含用于编译当前节点的可执行程序的配置选项。
	// console.log(process.argv);//命令参数--是一个数组。
	console.log(process.cwd());//工作目录
	console.log(process.platform);
	console.log("Console Input:"+data);
})

process.on('SIGINT',function(){
	console.log("\n能不能别按Ctrl+C");
	process.exit((function (){
		console.log("abc");
	})());
})