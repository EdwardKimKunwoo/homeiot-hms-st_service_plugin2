/* Copyright (c) 2020 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

var aptBrandInfoList = {
    SMARTTHINGS: {
        brand_color: "#3695DD",
        gradation_top_color: "#49A5EA",
        gradation_middle_color: "#81BEEF",
        gradation_bottom_color: "#EAEDF1",
        apt_info: "SmartThings",
    },
    RAEMIAN: {
        brand_color: "#2EACA7",
        gradation_top_color: "#45BCAF",
        gradation_middle_color: "#60D0B8",
        gradation_bottom_color: "#E4EFEF",
        apt_info: ((lang === "ko") ? "래미안퍼스티지" : "Raemian Firstige"),
    },
    POSCO: {
        brand_color: "#718CC7",
        gradation_top_color: "#849FDA",
        gradation_middle_color: "#A7C5FF",
        gradation_bottom_color: "#EAEDF1",
        apt_info: ((lang === "ko") ? "포스코건설 더샵" : "Posco"),
    },
    HILLSTATE: {
        brand_color: "#981C1E",
        gradation_top_color: "#A0423F",
        gradation_middle_color: "#C46150",
        gradation_bottom_color: "#F0EAEA",
        apt_info: ((lang === "ko") ? "힐스테이트" : "Hillstate"),
    },
    LOTTE: {
        brand_color: "#BD885C",
        gradation_top_color: "#D5A781",
        gradation_middle_color: "#F2CBAB",
        gradation_bottom_color: "#F0EBE4",
        apt_info: ((lang === "ko") ? "롯데" : "Lotte"),
    },
    CAMUS: {
        brand_color: "#164899",
        gradation_top_color: "#2456A6",
        gradation_middle_color: "#9CB0D0",
        gradation_bottom_color: "#E4E6EA",
        apt_info: ((lang === "ko") ? "까뮤" : "Camus"),
    },
    RBDK: {
        brand_color: "#2B3C4D",
        gradation_top_color: "#52616F",
        gradation_middle_color: "#ABB1B6",
        gradation_bottom_color: "#DFE1E1",
        apt_info: "RBDK",
    },
    PRUGIO: {
        brand_color: "#074F51",
        gradation_top_color: "#246365",
        gradation_middle_color: "#9CB6B6",
        gradation_bottom_color: "#E4E7E7",
        apt_info: ((lang === "ko") ? "푸르지오" : "Prugio"),
    },
    BLUE: {
        brand_color: "#003981",
        gradation_top_color: "#2E5192",
        gradation_middle_color: "#A0AEC8",
        gradation_bottom_color: "#DEDFE5",
        apt_info: ((lang === "ko") ? "블루지움" : "Blue"),
    },
    LYNN: {
        brand_color: "#F09000",
        gradation_top_color: "#EAAA67",
        gradation_middle_color: "#ECD2B7",
        gradation_bottom_color: "#ECEAE7",
        apt_info: ((lang === "ko") ? "우미 린" : "Lynn"),
    },
    LANDME: {
        brand_color: "#00388F",
        gradation_top_color: "#4B5E92",
        gradation_middle_color: "#ACB4C8",
        gradation_bottom_color: "#E6E7E9",
        apt_info: "LAND me",
    },
    IAAN: {
        brand_color: "#20B500",
        gradation_top_color: "#7AD168",
        gradation_middle_color: "#BFE2B8",
        gradation_bottom_color: "#E8EBE7",
        apt_info: ((lang === "ko") ? "이안" : "iaan"),
    },
    LUXNINE: {
        brand_color: "#691863",
        gradation_top_color: "#90598C",
        gradation_middle_color: "#C8B2C6",
        gradation_bottom_color: "#E9E7E9",
        apt_info: ((lang === "ko") ? "안강럭스나인" : "LuxNine"),
    },
    PARAVIEW: {
        brand_color: "#653982",
        gradation_top_color: "#653982",
        gradation_middle_color: "#A99BB3",
        gradation_bottom_color: "#E6E4E7",
        apt_info: ((lang === "ko") ? "삼일파라뷰" : "PARAVIEW"),
    },
    RAEMIAN_LEADERSONE: {
        brand_color: "#2EACA7",
        gradation_top_color: "#45BCAF",
        gradation_middle_color: "#60D0B8",
        gradation_bottom_color: "#E4EFEF",
        apt_info: ((lang === "ko") ? "래미안" : "Raemian"),
    },        
};

var apt_info="";

function setAptBrand(name) {
    // set brand info
    let aptBrandInfo = aptBrandInfoList[name.toUpperCase()];
    if (!aptBrandInfo) {
        aptBrandInfo = aptBrandInfoList[SMARTTHINGS.toUpperCase()];
    }

    // set css variables
    let root = document.documentElement;
    root.style.setProperty("--brand-color", aptBrandInfo.brand_color);
    root.style.setProperty("--brand-color-8pro", aptBrandInfo.brand_color + "14");  // brandcolor + 8% alpha
    root.style.setProperty("--brand-color-50pro", aptBrandInfo.brand_color + "80"); // brandcolor + 50% alpha
    root.style.setProperty("--gradation-top-color", aptBrandInfo.gradation_top_color);
    root.style.setProperty("--gradation-middle-color", aptBrandInfo.gradation_middle_color);
    root.style.setProperty("--gradation-bottom-color", aptBrandInfo.gradation_bottom_color);

    // set apt_info text
    apt_info = aptBrandInfo.apt_info;

    // apt_info
    // information detail page 내 service 이름
    if (document.getElementById("infoServiceName"))
        document.getElementById("infoServiceName").innerText = apt_info;
    // main_screen의 option menu 내 "xxxx 정보"
    if (typeof createOptionMenu === 'function')
        createOptionMenu();
    // TODO : information detail page 내 actionbar title

}

setAptBrand(apt_name);