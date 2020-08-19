/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

// exported by activity-stream.bundle.js
window.NewtabRenderUtils.renderWithoutState();window.addEventListener('load', function(){
    
  var elementkun=document.getElementsByClassName("outer-wrapper")[0];
  var url_head="resource://activity-stream/background-images/"
  var n = 1+ Math.floor(Math.random() * 99);
  var background_url=url_head + n + ".jpg";
  elementkun.style.backgroundImage="url("  + background_url +")"; 
});