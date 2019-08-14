<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col
				:span="10"
				class="logo"
				:class="collapsed?'logo-collapse-width':'logo-width'"
			>{{collapsed?'':sysName}}</el-col>
			<el-col :span="18" class="userinfo">
				<ul class="nav-top">
					<li>
						<i class="el-icon-message" aria-hidden="true" style="font-size:24px"></i>
					</li>
					<li>
						<span class="account-label">
							<span>广告主：</span>
							<span>ID：</span>
						</span>
						<span class="account-label" style="text-align: left;">
							<span>{{advName}}</span>
							<span>{{advId}}</span>
						</span>
					</li>
					<li>
						<span class="agent-cell">
							<!-- <span @click="toCom" style="cursor: pointer;">{{company}}</span> -->
							<router-link
								:to="'/admin/index'"
								style="color:#fff;text-align: left;"
								:title="company"
							>{{company}}</router-link>
						</span>
					</li>
					<li>
						<span class="el-dropdown-link userinfo-inner" @click="logout">退出</span>
					</li>
				</ul>
			</el-col>
		</el-col>
		<el-col :span="24" class="sec-header">
			<el-menu
				:default-active="activeSelect"
				router
				class="el-menu-demo header"
				mode="horizontal"
				@select="handleselect"
				background-color="#343a40"
				text-color="#868e96"
			>
				<template v-for="(item,index) in $router.options.routes" v-if="item.sec && !item.hidden ">
					<el-menu-item :index="index+''" @click="$router.push(item.children[0].path)">{{item.name}}</el-menu-item>
				</template>
			</el-menu>
		</el-col>
		<div class="layOut page-scroll">
			<router-view name="nmpBar"></router-view>
			<router-view></router-view>
		</div>
	</el-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data () {
		return {
			sysName: '天翼M系统',
			collapsed: false,
			sysUserName: '',
			sysUserAvatar: '',
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			datas: this.$route.query.data
		}
	},
	computed: {
		advName () {
			return this.$store.state.titlemess.advName
		},
		company () {
			return this.$store.state.titlemess.company
		},
		advId () {
			return this.$store.state.titlemess.advId
		},
		isGroup () {
			console.log(this.$store.state)
		},
		activeSelect () {
			// console.log(12121,this.$store.state.titlemess.activeSelect)
			return this.$store.state.titlemess.activeSelect
		},
		...mapGetters([
		'permission_routers',
		// 'sidebar'
		])
	},
	methods: {
		aa: function (path) {
			this.$router.push(path);
		},
		onSubmit () {
			console.log('submit!');
		},
		handleopen (item) {
			console.log('handleopen', item);
		},
		handleclose () {
			//console.log('handleclose');
		},
		handleselect: function (a, b) {
			console.log(a)
			this.$store.commit("changeActiveSelect", a);
			console.log('activeSelect', this.activeSelect)
		},
		//退出登录
		logout: function () {
			var _this = this;
			//   this.$confirm('确认退出吗?', '提示', {
			//     //type: 'warning'
			//   }).then(() => {
			sessionStorage.removeItem('token');
			_this.$router.push('/login');
			//   }).catch(() => {
			//   });
		},
		//折叠导航栏
		// collapse: function () {
		//  this.collapsed = !this.collapsed;
		// },
		showMenu (i, status) {
			this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
		}
	},
	mounted () {
		var user = sessionStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			this.sysUserName = user.name || '';
			this.sysUserAvatar = user.avatar || '';
		}
		if (this.datas) {
			let nowactive = JSON.parse(this.datas)
			if (nowactive.activeName && nowactive.adId) {
				this.$store.commit("changeActive", nowactive.activeName);
				this.$store.commit("getadId", nowactive.adId);				
			} else {
				// this.$store.commit("changeActive", 'group');
			}

			sessionStorage.setItem('nowdata', this.datas)
			this.$store.commit("changeMes", JSON.parse(this.datas));

		} else {
			let data = sessionStorage.getItem('nowdata');
			this.$store.commit("changeMes", JSON.parse(data));
		}
	},
	watch: {
		activeSelect: function () {
			console.log('watch', this.activeSelect)
		}
	}
}
</script>
<style scoped lang="scss">
@import "~scss_vars";
.container {
	position: relative;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.header {
		height: 60px;
		line-height:60px;
		background: $color-primary;
		color: #fff;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
			}
		}
		.logo {
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			.txt {
				color: #fff;
			}
		}
		.logo-width {
			width: 190px;
		}
		.logo-collapse-width {
			width: 60px;
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.sec-header .header,.sec-header .header .el-menu-item{
		height: 50px;
		line-height: 50px;
	}
	.main {
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		aside {
			flex: 0 0 190px;
			width: 190px;
			.el-menu {
				height: 100%;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
		}
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
		}
		.menu-expanded {
			flex: 0 0 190px;
			width: 190px;
		}
		.content-container {
			flex: 1;
			overflow-y: scroll;
			padding: 20px;
			.breadcrumb-container {
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
	.el-submenu .el-menu-item {
		min-width: 190px;
	}
	.nav-top li {
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		-webkit-align-items: center;
		-moz-align-items: center;
		-ms-align-items: center;
		-o-align-items: center;
		align-items: center;
		height: 20px;
		border-left: 1px dotted #fff;
		padding: 0 10px;
		line-height: 22px;
	}
	.nav-top li:first-child {
		border-left: 0;
	}
	.nav-top {
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		align-items: center;
		height: 65px;
		position: absolute;
		right: 15px;
		top: 0;
	}
	.account-label {
		display: -webkit-inline-flex;
		display: -moz-inline-flex;
		display: -ms-inline-flex;
		display: -o-inline-flex;
		display: inline-flex;
		flex-direction: column;
		border: 0;
	}
	.nav-top .agent-cell {
		display: -webkit-inline-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		max-width: 100px;
		overflow: hidden;
	}
}
.el-menu--horizontal > .el-menu-item.is-active {
	border-bottom: 2px solid #3892ed;
	color: #fff;
}
</style>