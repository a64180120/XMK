<template>
  <div class="usbKey">
    <table
      id="Table5"
      style="z-index: 101; left: 8px; width: 100%; position: absolute;top: 610px"
      cellspacing="1"
      cellpadding="1"
      border="0"
    >
      <tr>
        <td align="center" style="height: 22px">
          <object
            name="AF"
            width="100%"
            height="25"
            classid="clsid:B371A9E1-158C-4318-B6F7-8D0BB9AE041E"
            :codebase="UsbKeyUrl+'custom2/Resource/Newgrand.cab#Version=6,8,0,3'"
          >
            <PARAM name="_Version" value="65536"/>
            <PARAM name="_ExtentX" value="32147"/>
            <PARAM name="_ExtentY" value="661"/>
            <PARAM name="_StockProps" value="13"/>
            <PARAM name="ForeColor" value="0"/>
            <PARAM name="BackColor" value="16777215"/>
            <PARAM name="MainProductID" value/>
            <param name="Lgg" value="Chinese">
            <param name="ClientInner_DLL" value="ClientInner.dll">
            <param name="ClientInner_Version" value="3.0.0.11">
            <param name="URL_NSServer" :value="UsbKeyUrl+'NSServer/default.aspx'">
            <param name="MainProductID" value="G6">
            <param name="URL_Shortcut" value>
            <param name="inifile" value="Modules.ini">
            <font color="#000000" face="宋体" size="3">
              无法下载、运行新中大客户端控件！
              <br>请在 "Internet选项"
              中降低安全级别，使得ActiveX控件允许被下载，然后重新刷新本页
              <br>或者点
              <a href="/Resource/UsbKeyEnvSetup.exe">客户端安装程序</a>，下载,运行该程序即可.
            </font>
          </object>
          <object
            id="USBVal"
            height="0"
            width="0"
            classid="clsid:1CF267CC-953F-4B27-A7E7-42A8769A903A"
            viewastext
          >
            <param name="_Version" value="65536">
            <param name="_ExtentX" value="26">
            <param name="_ExtentY" value="26">
            <param name="_StockProps" value="0">
          </object>
        </td>
      </tr>
      <tr></tr>
    </table>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'usbKey',
  data() {
    return {
      UsbKeyUrl: window.global.UsbKeyUrl
    }
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {}
}
</script>
