;
/*
Vue.http.get("list.json").then(function(response) {
	run(response.data);
});
*/
var items = jsonData || {};
run(items);

/**
 * is HTPPURL
 * @param sting data 内容
 * @return boolean
 */
function isURL(data) {
	var reg = /^(http(s)?:\/\/)?(([\w-~]+)\.)+[com|cn|com.cn|net|xyz|io|org|top|xin|bid|win|kim|me]([\w-~\/])*$/i;
	return reg.test(data);
}

/**
 * run core
 * @param {Object} items jsonData
 */
function run(items) {
	//搜索
	var vm = new Vue({
		el: "#search",
		data: {
			URL: "https://www.baidu.com/s?wd=%s&ie=UTF-8",
			message: "",
			items:items["search"]
		},
		methods: {
			search: function(target) {
				var newURL = target.value;
				var data = this.message;
				var URL = (typeof newURL === "string") ? newURL : this.URL;
				//if this url is address 
				if(isURL(data)) {
					if(data.indexOf("http") > -1) {
						location.href = data;
					} else {
						location.href = "http://" + data;
					}
					return;
				}
				//普通搜索
				if(data.trim() === ""){
					console.log(target.getAttribute("hostname"));
					location.href = "http://" + target.getAttribute("hostname");
					return;
                 }
				location.href = URL.replace(/\%s/g, data);
			},
		},
		watch: {
			message: function(data) {
				this.message = data;
			}
		},
		mounted: function() {
			this.$refs.input.focus();
		}
	});

	//第三方搜索
	new Vue({
		el: "#search-for-three",
		data: {
			items: items["search"],
		},
		methods: {
			search: function(event) {
				vm.search(event.target);
			}
		}

	});
	//书签
	new Vue({
		el: "#content",
		data: {
			items: items["card"],
		},

	});

}