// @name	同IP站点查询.popup.js
// @version	1.0
// @author	Holger
// @github	https://github.com/h01/SameWeb
// @blog	http://ursb.org
// @update	2014/10/30

$(document).ready(function(){
	// 获取当前页面URL地址
	chrome.tabs.getSelected(null, function(e){
		try{
			$("#url").val(e.url.match(/http[s]?:\/\/([\w\.\-]+)\//)[1]);
		}catch(e){};
	});
	$("#scan").click(function(){
		// 检测URL是否填写
		var url = $("#url").val();
		if (url == "") {
			$("#msg").text("请输入要查询的域名或IP");
			$("#msg").attr("class", "text-danger");
			return ;
		};
		// 开始查询
		$("#res").html("");
		$("#msg").text("开始查询..");
		$("#msg").attr("class", "text-info");
		$("#scan").attr("disabled", true);
		$("#url").attr("disabled", true);
		$.ajax({
			tyle: 'GET',
			url: 'http://s.tool.chinaz.com/same?s=' + url,
			dataType: 'text',
			success: function(data, status){
				try{
					var temp = data.match(/.<\/span> <a href='([\w\:\/\.]*)'/g);
					var html = "<table class='table table-bordered table-striped table-hover'>";
					html += "<thead><th>#</th><th>URL</th></thead><tbody>";
					for (var i = 0; i < temp.length; i++) {
						var tmpUrl = temp[i].replace(".</span> <a href='", "").replace("'", "");
						html += "<tr><td>" + (i+1) + "</td><td><a href='" + tmpUrl + "' target='_blank'>" + tmpUrl + "</a></td></tr>";
					};
					html += "</tbody></table>";
					$("#res").html(html);
					$("#msg").html("查询完毕, 共有 <code>" + temp.length + "</code> 条结果");
					$("#msg").attr("class", "text-success");
				}catch(e){
					$("#msg").text("查询完毕, 没有找到结果!");
					$("#msg").attr("class", "text-warning");
				}
				$("#scan").attr("disabled", false);
				$("#url").attr("disabled", false);
			},
			error: function(){
				$("#msg").text("查询失败!");
				$("#msg").attr("class", "text-danger");
				$("#scan").attr("disabled", false);
				$("#url").attr("disabled", false);
			}
		});
	})
})
