<template>
	<div class="leftBar toolCase" style="width:210px">
		<div class="sideBar">
			<el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
				<div v-for="(nar,index) in $router.options.routes[4].children" :key="index" v-if="nar.isTool">
					<el-submenu  v-if="nar.isChild" :index="index+''">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>{{nar.name}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item  :index="nar.path">{{nar.child}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item  v-else :index="nar.path">
						<i class="el-icon-location"></i>
						<span slot="title">{{nar.name}}</span>
					</el-menu-item>
				</div>
			</el-menu>
		</div>
	</div>
</template>
<style>
.sideBar a {
	color: #000;
}
.toolCase .el-menu-item.is-active {
	background: #e2e2e2;
}
</style>

