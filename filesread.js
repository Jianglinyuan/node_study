var fs=require("fs")
	,stdin=process.stdin
	,stdout=process.stdout;
var stats=[];
/*
主程序开始
 */
fs.readdir(process.cwd(), function(err,files){
	console.log("");

	if (!files.length) {
		return console.log("\033[31m No Files to show!\033[39m\n");	
	};

	console.log("Select which file or directory you want to see\n");
/**
 * 输出目录和文件列表
 * @param  {int} i [用以循环输出目录和文件]
 * @return {file}   
 */
	function file (i){
		var filename = files[i];
		fs.stat(__dirname + '/' + filename, function(err,stat){
			stats[i]=stat;
			if (stat.isDirectory()) {
				console.log(""+i+"\033[36m"+filename+"/\033[39m");

			}else{
				console.log(""+i+"\033[90m"+filename+"\033[39m");
			}

			i++;
			if (i==files.length) {
				read();
			}else{
				file(i);
			}
		});
	}
	/**
	 * 输出完毕后继续读取用户选择
	 * @return {Null} 
	 */
	function read(){
		console.log("");
		process.stdout.write("\033[33mEnter your choice:\033[39m");
		process.stdin.resume();
		stdin.setEncoding("utf8");
		stdin.on("data",option);
	}

	function option(data){
		filename=files[Number(data)];
		
		if (!filename) {
			stdout.write("\033[31mEnter your choice:\033[39m");
		}else{
			if (stats[Number(data)].isDirectory()) {
				fs.readdir(__dirname+"/"+filename,function(err,files){
					console.log("");
					console.log("("+files.length+"files)");
					files.forEach(function (file){
						console.log("-"+file);
					});
					console.log("");
				})
			}else{
			fs.readFile(__dirname+"/"+filename, "utf8", function(err,data){
				console.log("");
				console.log("\033[90m"+data.replace(/(.*)/g,"$1")+"\033[39m");
			});
			}
		}
	}
	/*
	程序开始
	 */
	file(0);
})