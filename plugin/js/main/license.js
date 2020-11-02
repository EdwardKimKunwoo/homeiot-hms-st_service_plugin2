/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview license page to show license description.
 * @module main/license
 */

function LicensePage() {}

LicensePage.prototype = {
  /** Get title of page.
  * @return {string}
  */
  getPageTitleText: function () {
    return $.lang[lang].LICENSES;
  },
  /** Execute view of page. */
  onViewPage: function () {
    return loadedLicensePage();
  }
}

/** Load license page */
function loadedLicensePage() {
  drawActionBar(false);

  if (isFHub())
    scplugin.manager.setFlag("openAdditionalPage");

  initLicensePage();
  drawLicensePage();

  return;
}

/** Initiate page */
function initLicensePage() {
  document.getElementById('licensePage').innerHTML = "";
}

/** draw page */
function drawLicensePage() {
  var innerText = "";

  innerText += '<pre style="word-wrap: break-word; white-space: pre-wrap; padding: 5px;">\n';
  innerText += 'This application is Copyright SAMSUNG SDS CO.,LTD. All rights reserved.\n';
  innerText += 'The following sets forth attribution notices for third party software that may be contained in this application.\n';
  innerText += 'If you have any questions or concerns, please contact us at shomeadmin@samsung.com\n';
  innerText += '\n';
  innerText += 'jquery\n';
  innerText += 'https://github.com/jquery/jquery\n';
  innerText += 'Copyright JS Foundation and other contributors\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'Datejs\n';
  innerText += 'http://www.coolite.com/datejs/\n';
  innerText += 'Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'jQuery UI\n';
  innerText += 'https://github.com/jquery/jquery-ui\n';
  innerText += 'Copyright jQuery Foundation and other contributors\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'chart.js\n';
  innerText += 'https://github.com/chartjs/Chart.js\n';
  innerText += 'Copyright (c) 2018 Chart.js Contributors\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'jquery.inview\n';
  innerText += 'https://github.com/protonet/jquery.inview\n';
  innerText += 'Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'jquery.scrollTo\n';
  innerText += 'https://github.com/flesler/jquery.scrollTo\n';
  innerText += 'Copyright (c) 2007 Ariel Flesler <aflesler@gmail.com>\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'Jquery Toast Plugin\n';
  innerText += 'https://github.com/kamranahmedse/jquery-toast-plugin\n';
  innerText += 'jQuery toast plugin created by Kamran Ahmed copyright MIT license 2015\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'jQuery UI Touch Punch\n';
  innerText += 'https://github.com/furf/jquery-ui-touch-punch\n';
  innerText += 'jQuery UI Touch Punch is (c) 2011David Furfero\n';
  innerText += 'MIT license\n';
  innerText += '\n';
  innerText += 'Swiper\n';
  innerText += 'https://github.com/nolimits4web/swiper\n';
  innerText += 'Copyright (c) 2014 Vladimir Kharlampidi\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += 'jQuery resizeend\n';
  innerText += 'https://nielse63.github.io/jquery.resizeend/\n';
  innerText += 'Copyright (c) 2015 Erik Nielsen\n';
  innerText += 'MIT License\n';
  innerText += '\n';
  innerText += '\n';
  innerText += '\n';
  innerText += 'The MIT License\n';
  innerText += 'Copyright (c) <year> <copyright holders>\n';
  innerText += 'Permission is hereby granted, free of charge, to any person obtaining a copy\n';
  innerText += 'of this software and associated documentation files (the "Software"), to deal\n';
  innerText += 'in the Software without restriction, including without limitation the rights\n';
  innerText += 'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n';
  innerText += 'copies of the Software, and to permit persons to whom the Software is\n';
  innerText += 'furnished to do so, subject to the following conditions:\n';
  innerText += 'The above copyright notice and this permission notice shall be included in\n';
  innerText += 'all copies or substantial portions of the Software.\n';
  innerText += 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n';
  innerText += 'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n';
  innerText += 'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n';
  innerText += 'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n';
  innerText += 'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n';
  innerText += 'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n';
  innerText += 'THE SOFTWARE.\n';
  innerText += '\n';
  innerText += 'Apache License, Version 2.0\n';
  innerText += ' Apache License\n';
  innerText += 'Version 2.0, January 2004\n';
  innerText += 'http://www.apache.org/licenses/\n';
  innerText += 'TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION\n';
  innerText += '1. Definitions.\n';
  innerText += '"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.\n';
  innerText += '"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.\n';
  innerText += '"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.\n';
  innerText += '"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.\n';
  innerText += '"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.\n';
  innerText += '"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.\n';
  innerText += '"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).\n';
  innerText += '"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.\n';
  innerText += '"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."\n';
  innerText += '"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.\n';
  innerText += '2. Grant of Copyright License.\n';
  innerText += 'Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.\n';
  innerText += '3. Grant of Patent License.\n';
  innerText += 'Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.\n';
  innerText += '4. Redistribution.\n';
  innerText += 'You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:\n';
  innerText += '1.    You must give any other recipients of the Work or Derivative Works a copy of this License; and\n';
  innerText += '2.    You must cause any modified files to carry prominent notices stating that You changed the files; and\n';
  innerText += '3.    You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and\n';
  innerText += '4.    If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.\n';
  innerText += 'You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.\n';
  innerText += '5. Submission of Contributions.\n';
  innerText += 'Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.\n';
  innerText += '6. Trademarks.\n';
  innerText += 'This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.\n';
  innerText += '7. Disclaimer of Warranty.\n';
  innerText += 'Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.\n';
  innerText += '8. Limitation of Liability.\n';
  innerText += 'In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.\n';
  innerText += '9. Accepting Warranty or Additional Liability.\n';
  innerText += 'While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.\n';
  innerText += 'END OF TERMS AND CONDITIONS\n';
  innerText += 'APPENDIX: How to apply the Apache License to your work\n';
  innerText += 'To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets "[]" replaced with your own identifying information. (Don\'t include the brackets!) The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same "printed page" as the copyright notice for easier identification within third-party archives.\n';
  innerText += 'Copyright [yyyy] [name of copyright owner]\n';
  innerText += 'Licensed under the Apache License, Version 2.0 (the "License");\n';
  innerText += 'you may not use this file except in compliance with the License.\n';
  innerText += 'You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n';
  innerText += 'Unless required by applicable law or agreed to in writing, software\n';
  innerText += 'distributed under the License is distributed on an "AS IS" BASIS,\n';
  innerText += 'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n';
  innerText += 'See the License for the specific language governing permissions and\n';
  innerText += 'limitations under the License.\n';
  innerText += '</pre>\n';

  document.getElementById("licensePage").innerHTML += innerText;
}
