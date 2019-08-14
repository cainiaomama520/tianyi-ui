<template>
	<div>
		<div class="nav-left">
			<div class="step-block create active">
				<div class="main-title">
					<span>创建广告组</span>
					<img
						src="//s1.pstatp.com/bytecom/platform_web/static/image/complete.svg?4a2bf5aae48760b60dc6d007875c8c5d"
					>
				</div>
				<div class="sub-title">
					<ul>
						<li class="active">推广目的</li>
					</ul>
				</div>
			</div>
			<div class="step-block create forbidden">
				<div class="main-title">
					<span>创建广告计划</span>
					<img
						src="//s1.pstatp.com/bytecom/platform_web/static/image/complete.svg?4a2bf5aae48760b60dc6d007875c8c5d"
					>
				</div>
				<div class="sub-title">
					<ul>
						<li class="active">投放范围</li>
						<li class>投放目标</li>
						<li class>网页链接</li>
						<li class>用户定向</li>
						<li class>预算与出价</li>
						<li class>计划名称</li>
					</ul>
				</div>
			</div>
			<div class="step-block create forbidden">
				<div class="main-title">
					<span>创建创意</span>
					<img
						src="//s1.pstatp.com/bytecom/platform_web/static/image/complete.svg?4a2bf5aae48760b60dc6d007875c8c5d"
					>
				</div>
				<div class="sub-title">
					<ul>
						<li class="active">计划名称</li>
						<li class>设置投放位置</li>
						<li class>制作创意</li>
						<li class>账户品牌设置</li>
						<li class>创意分类</li>
						<li class>监测链接</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.nav-left {
    position: absolute;
    width: 200px;
    height: calc(100vh - 65px);
    background: #fff;
    border-right: 1px solid #eaeaea;
    overflow-y: auto;
}
.nav-left .step-block.active {
    background-color: #fafbfe;
}
.nav-left .step-block {
    user-select: none;
    padding: 24px 24px 32px;
    border-bottom: 1px solid #eaeaea;
}
.nav-left .step-block.active .sub-title li.active {
    color: #598fe6;
}
.nav-left .step-block .sub-title ul li {
    font-weight: 300;
    list-style: none;
    margin-bottom: 4px;
    display: block;
    text-decoration: none;
    color: #666;
    font-size: 14px;
    user-select: none;
}
.nav-left .step-block .main-title img {
    height: 22px;
    position: absolute;
    top: 0;
    right: 0;
}
.nav-left .step-block.create.complete img {
    display: block;
}
.nav-left .step-block .main-title {
    position: relative;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
}

</style>
