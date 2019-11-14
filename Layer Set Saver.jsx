#target Photoshop  
app.bringToFront();  
  
  
main();  
function main(){  
if(!documents.length) return;  
Prefs ={};  
var UUID = 'f1742f10-a6de-11e2-9e96-0800200c9a66';  
try{  
var desc1 = app.getCustomOptions(UUID);  
Prefs = eval(desc1.getString(0));  
}catch(e){  
Prefs.Trim=false;  
Prefs.Merge=false;  
Prefs.OutFolder=app.activeDocument.path;  
Prefs.SaveOptions=0;  
Prefs.FileType=4;  
Prefs.TiffOptions =0;  
Prefs.Quality =79;  
Prefs.jpgQuality=7;  
}  
  
  
var selLayers = getSelectedLayersIdx();  
selectedLayers =new Array();  
selectedLayers = getNormalLayers(selLayers);  
var LayerSetLayers=[];  
var lSets = getLayerSets();  
for(var z in lSets){  
var lset = getChildIndex(Number(lSets[z]), true );  
LayerSetLayers[Number(lSets[z])] = lset;  
}  
var win = new Window( 'dialog', 'LayerSet Saver' );   
g = win.graphics;  
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2, 1]);  
g.backgroundColor = myBrush;  
win.orientation='stack';  
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"});   
win.g1 = win.p1.add('group');  
win.g1.orientation = "row";  
win.title = win.g1.add('statictext',undefined,'LayerSet Saver');  
win.title.alignment="fill";  
var g = win.title.graphics;  
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);  
win.g5 =win.p1.add('group');  
win.g5.orientation = "row";  
win.g5.alignment='fill';  
win.g5.spacing=10;  
win.g5.p1= win.g5.add("panel", undefined, 'Please Select LayerSets', {borderStyle:"black"});  
win.g5.p1.preferredSize=[250,200];  
win.g5.p1.lb1 = win.g5.p1.add('listbox', undefined, undefined, {multiselect: true} );  
win.g5.p1.lb1.preferredSize=[220,170];  
win.g5.p2= win.g5.add("panel", undefined, 'What to Do', {borderStyle:"black"});  
win.g5.p2.preferredSize=[250,200];  
for(var a in lSets){  
    win.g5.p1.lb1.add('item',(getLayerNameByIndex( Number(lSets[a]))));  
}  
win.g50 =win.g5.p2.add('group');  
win.g50.orientation = "column";  
win.g50.alignment='left';  
win.g50.alignChildren='left';  
win.g50.spacing=10;  
win.g50.rb1 = win.g50.add('radiobutton',undefined,'Save selected layers ('+selectedLayers.length + ')?');  
win.g50.rb2 = win.g50.add('radiobutton',undefined,'Save all layers in all LayerSets?');  
win.g50.rb3 = win.g50.add('radiobutton',undefined,'Save all layers in selected LayerSets?');  
win.g50.rb4 = win.g50.add('radiobutton',undefined,'Save selected LayerSets?');  
win.g50.rb5 = win.g50.add('radiobutton',undefined,'Save all LayerSets?');  
  
  
win.g50.rb1.value=true;  
win.g50.rb1.onClick=function(){  
    if(win.g50.rb1.value) {  
        win.g5.p1.lb1.enabled=false;  
        }else{  
            win.g5.p1.lb1.enabled=true;  
            }  
    }  
win.g50.rb1.onClick();  
win.g50.rb2.onClick=function(){  
    win.g50.rb1.onClick();  
    }  
win.g50.rb3.onClick=function(){  
    win.g50.rb1.onClick();  
    }  
win.g50.rb4.onClick=function(){  
    win.g50.rb1.onClick();  
    }  
win.g50.rb5.onClick=function(){  
    win.g50.rb1.onClick();  
    }  
var lSetsSelected=new Array();  
for(var f in lSets){  
    for(var t in selLayers){  
        if(Number(lSets[f]) == Number(selLayers[t])){  
            lSetsSelected.push(f);  
            }  
        }  
    }  
if(lSetsSelected.length > 0){  
    win.g5.p1.lb1.selection = lSetsSelected;  
    win.g50.rb4.value=true;  
    win.g50.rb1.onClick();  
    }  
win.g100 =win.p1.add('group');  
win.g100.alignment='row';  
win.g100.spacing=10;  
win.g100.p1 = win.g100.add("panel", undefined,'Output Options', {borderStyle:"black"});  
win.g100.p1.preferredSize=[520,40];  
win.g100a =win.g100.p1.add('group');  
win.g100a.alignment='fill';  
win.g100a.spacing=10;  
win.g100a.et1 = win.g100a.add('edittext');  
win.g100a.et1.preferredSize=[390,20];  
win.g100a.et1.enabled=false;  
//win.g100a.bu1 = win.g100a.add( 'image', undefined, 'SourceFolderIcon' );  
win.g100a.bu1 = win.g100a.add( 'button', undefined, 'Browse' );  
win.g100a.bu1.onClick=function(){  
try{  
    docPath = Prefs.OutFolder;  
    }catch(e){docPath= Folder("~");}  
outputFolder = Folder.selectDialog("Please select the output folder",docPath);  
if(outputFolder !=null){  
        Prefs.OutFolder=outputFolder;  
win.g100a.et1.text =  decodeURI(outputFolder.fsName);   
}  
}  
if(Folder(Prefs.OutFolder).exists){  
    outputFolder=Folder(Prefs.OutFolder);  
    win.g100a.et1.text =  decodeURI(outputFolder.fsName);   
    }  
win.g100b =win.g100.p1.add('group');  
win.g100b.alignment='fill';  
win.g100b.spacing=10;  
win.g100b.cb1 = win.g100b.add('checkbox',undefined,'Merge visible Layers?');  
win.g100b.cb2 = win.g100b.add('checkbox',undefined,'Trim Layer(s)?');  
win.g100b.cb2.value = Prefs.Trim;  
win.g100b.cb1.value = Prefs.Merge;  
win.g120 =win.g100.p1.add('group');  
win.g120.orientation = "row";  
win.g120.alignment='left';  
var Options= ["Layer Name","FileName + Sequence No.","FileName + Layer Name ","User Defined with Sequence No."];  
win.g120.st1 = win.g120.add('statictext',undefined,'Save Options');  
win.g120.dd1 = win.g120.add('dropdownlist',undefined,Options);  
win.g120.dd1.selection=Number(Prefs.SaveOptions);  
win.g120.et1 = win.g120.add('edittext');  
win.g120.et1.preferredSize=[150,20];  
win.g120.et1.hide();  
win.g120.dd1.onChange=function(){  
  if(this.selection.index==3){  
      win.g120.et1.show();  
      }else{  
          win.g120.et1.hide();  
          }  
    }  
win.g125 =win.g100.p1.add('group');  
win.g125.orientation = "row";  
win.g125.st1 = win.g125.add('statictext',undefined,'Save as :');  
var Types = ["PNG","PSD","PDF","TIF","JPG","JPG SFW"];  
win.g125.dd1 = win.g125.add('dropdownlist',undefined,Types);  
win.g125.dd1.selection = Number(Prefs.FileType);  
win.g125.alignment='left';  
  
  
win.g130 =win.g125.add('group');  
win.g130.orientation = "stack";  
  
  
win.g130b =win.g130.add('group');  
win.g130b.st1 = win.g130b.add('statictext',undefined,'Quality');  
win.g130b.dd1 = win.g130b.add('dropdownlist');  
for(var a =1;a<13;a++){  
    win.g130b.dd1.add('item',a);  
    }  
win.g130b.dd1.selection = Number(Prefs.jpgQuality);  
win.g130b.visible=false;  
  
  
win.g130c =win.g130.add('group');  
win.g130c.st1 = win.g130c.add('statictext',undefined,'Compression');  
var tiffOptions=["LZW","ZIP","JPG","None"];  
win.g130c.dd1 = win.g130c.add('dropdownlist',undefined,tiffOptions);  
win.g130c.dd1.selection = Prefs.TiffOptions;  
win.g130c.visible=false;  
  
  
win.g130d =win.g130.add('group');  
win.g130d.st1 = win.g130d.add('statictext',undefined,'Quality');  
win.g130d.dd1 = win.g130d.add('dropdownlist');  
for(var a =1;a<101;a++){  
    win.g130d.dd1.add('item',a);  
    }  
win.g130d.dd1.selection=Prefs.Quality;  
win.g130d.visible=false;  
win.g125.dd1.onChange=function(){  
    switch(Number(this.selection.index)){  
        case 0 : win.g130b.visible=false; win.g130c.visible=false; win.g130d.visible=false; break;  
        case 1 : win.g130b.visible=false; win.g130c.visible=false; win.g130d.visible=false; break;  
        case 2 : win.g130b.visible=false; win.g130c.visible=false; win.g130d.visible=false; break;  
        case 3 : win.g130b.visible=false; win.g130c.visible=true; win.g130d.visible=false; break;  
        case 4 : win.g130b.visible=true; win.g130c.visible=false; win.g130d.visible=false; break;  
        case 5 : win.g130b.visible=false; win.g130c.visible=false; win.g130d.visible=true; break;  
        default :break;  
        }  
}  
win.g125.dd1.onChange();  
win.g1000 =win.p1.add('group');  
win.g1000.alignment='row';  
win.g1000.spacing=10;  
win.g1000.p1 = win.g1000.add("panel", undefined, undefined, {borderStyle:"black"});  
win.g1000.p1.preferredSize=[520,40];  
win.g1000.p1.orientation = "row";  
win.g1000.p1.alignment='fill';  
win.g1000.p1.bu1 = win.g1000.p1.add('button',undefined,'Process');  
win.g1000.p1.bu1.preferredSize=[235,30];  
win.g1000.p1.bu2 = win.g1000.p1.add('button',undefined,'Cancel');  
win.g1000.p1.bu2.preferredSize=[235,30];  
function SaveDOC(saveFile){  
    switch(Number(win.g125.dd1.selection.index)){  
        case 0 : SavePNG(File(saveFile+".png")); break;  
        case 1:  SavePSD(File(saveFile+".psd")); break;  
        case 2:  SavePDF(File(saveFile+".pdf")); break;  
        case 3:  SaveTIFF(File(saveFile+".tif"),Number(win.g130c.dd1.selection.index)); break;  
        case 4:  SaveJPG(File(saveFile+".jpg"),Number(win.g130b.dd1.selection.index)+1); break;  
        case 5:  SaveForWeb(File(saveFile+".jpg"),Number(win.g130d.dd1.selection.index)+1)  break;  
        default : break;  
        }  
};  
function getName(seq,lName){  
lName = lName.replace(/\....$/,'');  
seq = zeroPad((Number(seq)+1), 3);  
 var dName = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');  
var Name ='';  
switch (Number(win.g120.dd1.selection.index)){  
    case 0: Name += lName; break;  
    case 1: Name += dName +"-"+seq; break;  
    case 2: Name += dName +"-"+ lName; break;  
    case 3: Name += win.g120.et1.text + "-"+seq; break;  
    default :break;  
    }  
return Name;  
}  
     
win.g1000.p1.bu1.onClick=function(){  
if(win.g100a.et1.text == ''){  
    alert("No output folder has been selected!");  
    return;  
        }  
if(!outputFolder.exists){  
    alert("Output folder does not exist!");  
    return;  
    }  
Prefs.Merge = win.g100b.cb1.value;  
Prefs.Trim = win.g100b.cb2.value;  
Prefs.SaveOptions=win.g120.dd1.selection.index;  
Prefs.FileType = win.g125.dd1.selection.index;  
Prefs.TiffOptions = win.g130c.dd1.selection.index;  
Prefs.Quality = win.g130d.dd1.selection.index;  
Prefs.jpgQuality=win.g130b.dd1.selection.index;  
var desc2 = new ActionDescriptor();  
desc2.putString(0, Prefs.toSource());   
app.putCustomOptions(UUID, desc2, true );  
win.close(0);  
if(win.g50.rb1.value){//Save selected layers  
for(var a in selectedLayers){  
var lName = getLayerNameByIndex( Number(selectedLayers[a])).toString().replace(/[:\/\\*\?\"\<\>\|]/g, "_");  
var saveFile= File(outputFolder+ "/" + getName(a,lName));  
selectLayerByIndex(Number(selectedLayers[a]));  
dupLayers();  
if(win.g100b.value)  try{activeDocument.mergeVisibleLayers();}catch(e){}  
if(win.g100b.cb2.value){  
try{   
activeDocument.backgroundLayer;   
var back = true;  
}catch(e){var back =false;}  
    if(!back){  
        try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}  
        }else{  
            try{activeDocument.trim(TrimType.TOPLEFT,true,true,true,true);}catch(e){}  
            }  
    }  
SaveDOC(saveFile);  
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    }//end selected layers  
    };  
if(win.g50.rb2.value){//Save all layers in all LayerSets  
var count =0;  
for(var a in lSets){  
    var layerToProcess = LayerSetLayers[Number(lSets[a])];  
    var selectedLay = getNormalLayers(layerToProcess);  
for(var b in selectedLay){  
var lName = getLayerNameByIndex( Number(selectedLay[b])).toString().replace(/[:\/\\*\?\"\<\>\|]/g, "_");  
var saveFile= File(outputFolder+ "/" + getName(count,lName));  
selectLayerByIndex(Number(selectedLay[b]));  
dupLayers();  
if(win.g100b.value)  try{activeDocument.mergeVisibleLayers();}catch(e){}  
if(win.g100b.cb2.value){  
try{   
activeDocument.backgroundLayer;   
var back = true;  
}catch(e){var back =false;}  
    if(!back){  
        try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}  
        }else{  
            try{activeDocument.trim(TrimType.TOPLEFT,true,true,true,true);}catch(e){}  
            }  
    }  
SaveDOC(saveFile);  
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
count++;  
    }//end selectedlay  
    }  
    };//end Save all layers in all LayerSets  
if(win.g50.rb3.value){//Save all layers in selected LayerSets  
var lSets2 = new Array();  
var selGroups = win.g5.p1.lb1.selection;  
for(var g in  selGroups){ lSets2.push(Number(lSets[Number(selGroups[g])]));}  
var count =0;  
for(var a in lSets2){  
    var layerToProcess = LayerSetLayers[Number(lSets2[a])];  
    var selectedLay = getNormalLayers(layerToProcess);  
for(var b in selectedLay){  
var lName = getLayerNameByIndex( Number(selectedLay[b])).toString().replace(/[:\/\\*\?\"\<\>\|]/g, "_");  
var saveFile= File(outputFolder+ "/" + getName(count,lName));  
selectLayerByIndex(Number(selectedLay[b]));  
dupLayers();  
if(win.g100b.value)  try{activeDocument.mergeVisibleLayers();}catch(e){}  
if(win.g100b.cb2.value){  
try{   
activeDocument.backgroundLayer;   
var back = true;  
}catch(e){var back =false;}  
    if(!back){  
        try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}  
        }else{  
            try{activeDocument.trim(TrimType.TOPLEFT,true,true,true,true);}catch(e){}  
            }  
    }  
SaveDOC(saveFile);  
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
count++;  
    }//end selectedlay  
    }  
    };//end Save all layers in selected LayerSets  
if(win.g50.rb4.value){//Save selected LayerSets  
var lSets2 = new Array();  
var selGroups = win.g5.p1.lb1.selection;  
for(var g in  selGroups){ lSets2.push(Number(lSets[Number(selGroups[g].index)]));}  
var count =0;  
for(var a in lSets2){  
var lName = getLayerNameByIndex( Number(lSets2[a])).toString().replace(/[:\/\\*\?\"\<\>\|]/g, "_");  
var saveFile= File(outputFolder+ "/" + getName(count,lName));  
selectLayerByIndex(Number(lSets2[a]));  
dupLayers();  
if(win.g100b.value)  try{activeDocument.mergeVisibleLayers();}catch(e){}  
if(win.g100b.cb2.value){  
try{   
activeDocument.backgroundLayer;   
var back = true;  
}catch(e){var back =false;}  
    if(!back){  
        try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}  
        }else{  
            try{activeDocument.trim(TrimType.TOPLEFT,true,true,true,true);}catch(e){}  
            }  
    }  
SaveDOC(saveFile);  
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
count++;  
    }//end lSets2  
    };//end Save  selected LayerSets  
if(win.g50.rb5.value){//Save all LayerSets  
var count =0;  
for(var a in lSets){  
var lName = getLayerNameByIndex( Number(lSets[a])).toString().replace(/[:\/\\*\?\"\<\>\|]/g, "_");  
var saveFile= File(outputFolder+ "/" + getName(count,lName));  
selectLayerByIndex(Number(lSets[a]));  
dupLayers();  
if(win.g100b.value)  try{activeDocument.mergeVisibleLayers();}catch(e){}  
if(win.g100b.cb2.value){  
try{   
activeDocument.backgroundLayer;   
var back = true;  
}catch(e){var back =false;}  
    if(!back){  
        try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}  
        }else{  
            try{activeDocument.trim(TrimType.TOPLEFT,true,true,true,true);}catch(e){}  
            }  
    }  
SaveDOC(saveFile);  
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
count++;  
    }//end lSets  
    };//end Save all LayerSets  
};  
win.show();  
};  
//Functions  
function isLayerSet(idx){  
var ref = new ActionReference();   
ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID( 'layerSection' ));   
ref.putIndex( charIDToTypeID( "Lyr " ), idx);  
var desc = executeActionGet(ref);  
var isSet = typeIDToStringID(desc.getEnumerationValue(stringIDToTypeID('layerSection')));  
var LayerSet=false;  
switch (isSet.toString()){  
    case 'layerSectionStart' : LayerSet=true; break;  
    case 'layerSectionEnd' : LayerSet=true; break;  
    case 'layerSectionConent' : LayerSet=false; break;  
    }  
return LayerSet;  
};  
function selectLayerByIndex(index,add,vis){   
add = (add == undefined)  ? add = false : add;  
    if (vis == undefined) vis = false;  
 var ref = new ActionReference();  
    ref.putIndex(charIDToTypeID("Lyr "), index);  
    var desc = new ActionDescriptor();  
    desc.putReference(charIDToTypeID("null"), ref );  
      if(add) desc.putEnumerated( stringIDToTypeID( "selectionModifier" ), stringIDToTypeID( "selectionModifierType" ), stringIDToTypeID( "addToSelection" ) );   
      desc.putBoolean( charIDToTypeID( "MkVs" ), vis );   
  try{  
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO );  
}catch(e){}  
};  
function noOfLayers(){  
   var ref = new ActionReference();   
   ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );   
   return executeActionGet(ref).getInteger(charIDToTypeID('NmbL'));  
}  
function getLayerSets(){   
   var ref = new ActionReference();   
   ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );   
   var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL')) +1;   
   var Lsets=[];  
try{  
    activeDocument.backgroundLayer;  
var i = 0; }catch(e){ var i = 1; };  
   for(i;i<count;i++){   
       if(i == 0) continue;  
        ref = new ActionReference();   
        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );  
        var desc = executeActionGet(ref);  
        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ));  
        if(layerName.match(/^<\/Layer group/) ) continue;  
        var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID( 'layerSection' )));  
        var isLayerSet =( layerType == 'layerSectionContent') ? false:true;  
        if(isLayerSet) Lsets.push(i);  
   };   
return Lsets;  
};  
function getLayerLayerSectionByIndex( index ) {     
   var ref = new ActionReference();   
   ref.putIndex(charIDToTypeID('Lyr '), index);  
   return typeIDToStringID(executeActionGet(ref).getEnumerationValue(stringIDToTypeID('layerSection')));  
};   
function getLayerNameByIndex( index ) {   
    var ref = new ActionReference();   
    ref.putIndex( charIDToTypeID( 'Lyr ' ), index );  
    return executeActionGet(ref).getString(charIDToTypeID( 'Nm  ' ));  
};  
function skipNestedSets( layerIndex ){  
   var isEnd = false;  
   layerIndex = app.activeDocument.layers[app.activeDocument.layers.length-1].isBackgroundLayer ? layerIndex-2:layerIndex;  
   while(!isEnd){  
      layerIndex--;  
      if( getLayerLayerSectionByIndex( layerIndex ) == 'layerSectionStart' ) layerIndex = skipNestedSets( layerIndex );  
      isEnd = getLayerNameByIndex(layerIndex) == '</Layer group>' ? true:false;  
   }  
   return layerIndex-1;  
};  
function getChildIndex(idx, skipNested ){  
   var layerSetIndex = idx;  
   var isEndOfSet = false;  
   var layerIndexArray = [];  
   while(!isEndOfSet){  
      layerSetIndex--;  
      if( getLayerLayerSectionByIndex( layerSetIndex ) == 'layerSectionStart' && skipNested ){  
         layerSetIndex = skipNestedSets( layerSetIndex );  
      }  
  if(getLayerLayerSectionByIndex( layerSetIndex ) == undefined) break;  
      isEndOfSet = getLayerNameByIndex(layerSetIndex) == '</Layer group>' ? true:false;  
     if(!isEndOfSet ) layerIndexArray.push( layerSetIndex );  
   }  
   return layerIndexArray;  
};  
function selectLayerByIndex(index,add){   
add = (add == undefined)  ? add = false : add;  
 var ref = new ActionReference();  
    ref.putIndex(charIDToTypeID('Lyr '), index);  
    var desc = new ActionDescriptor();  
    desc.putReference(charIDToTypeID('null'), ref );  
      if(add) desc.putEnumerated( stringIDToTypeID( 'selectionModifier' ), stringIDToTypeID( 'selectionModifierType' ), stringIDToTypeID( 'addToSelection' ) );   
      desc.putBoolean( charIDToTypeID( 'MkVs' ), false );   
  try{  
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO );  
}catch(e){}  
};  
function getIDXs(){   
   var ref = new ActionReference();   
   ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );   
   var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL')) +1;   
   var IDX=[];  
try{  
    activeDocument.backgroundLayer;  
var i = 0; }catch(e){ var i = 1; };  
   for(i;i<count;i++){   
       if(i == 0) continue;  
        ref = new ActionReference();   
        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );  
        var desc = executeActionGet(ref);  
        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ));  
        var Id = desc.getInteger(stringIDToTypeID( 'layerID' ));  
        if(layerName.match(/^<\/Layer group/) ) continue;  
        var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID( 'layerSection' )));  
        var isLayerSet =( layerType == 'layerSectionContent') ? false:true;  
        if(!isLayerSet) IDX.push(i);  
   };   
return IDX;  
};  
function getSelectedLayersIdx(){   
      var selectedLayers = new Array;   
      var ref = new ActionReference();   
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );   
      var desc = executeActionGet(ref);   
      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){   
         desc = desc.getList( stringIDToTypeID( 'targetLayers' ));   
          var c = desc.count   
          var selectedLayers = new Array();   
          for(var i=0;i<c;i++){   
            try{   
               activeDocument.backgroundLayer;   
               selectedLayers.push(  desc.getReference( i ).getIndex() );   
            }catch(e){   
               selectedLayers.push(  desc.getReference( i ).getIndex()+1 );   
            }   
          }   
       }else{   
         var ref = new ActionReference();   
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));   
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );   
         try{   
            activeDocument.backgroundLayer;   
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);   
         }catch(e){   
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));   
         }   
     var vis = app.activeDocument.activeLayer.visible;  
        if(vis == true) app.activeDocument.activeLayer.visible = false;  
        var desc9 = new ActionDescriptor();  
    var list9 = new ActionList();  
    var ref9 = new ActionReference();  
    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );  
    list9.putReference( ref9 );  
    desc9.putList( charIDToTypeID('null'), list9 );  
    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );  
    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();  
        app.activeDocument.activeLayer.visible = vis;  
      }   
      return selectedLayers;   
};  
function dupLayers() {  
var desc = new ActionDescriptor();  
var ref = new ActionReference();  
ref.putClass( charIDToTypeID('Dcmn') );  
desc.putReference( charIDToTypeID('null'), ref );  
desc.putString( charIDToTypeID('Nm  '), "Dup" );  
var ref2 = new ActionReference();  
ref2.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );  
desc.putReference( charIDToTypeID('Usng'), ref2 );  
executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );  
};  
function getLayerKindByIndex( index ) {  
    var ref, desc, adjustmentDesc, layerSectionType;  
   ref = new ActionReference();  
   ref.putIndex(charIDToTypeID( "Lyr " ), index );  
   desc =  executeActionGet(ref);  
   if( desc.hasKey( stringIDToTypeID( 'textKey' ) ) ) return LayerKind.TEXT;  
   if( desc.hasKey( stringIDToTypeID( 'smartObject' ) ) ) return LayerKind.SMARTOBJECT;// includes LayerKind.VIDEO  
   if( desc.hasKey( stringIDToTypeID( 'layer3D' ) ) ) return LayerKind.LAYER3D;  
   if( desc.hasKey( stringIDToTypeID( 'adjustment' ) ) ){  
      switch(typeIDToStringID(desc.getList (stringIDToTypeID('adjustment')).getClass (0))){  
      case 'photoFilter' : return LayerKind.PHOTOFILTER;  
      case 'solidColorLayer' : return LayerKind.SOLIDFILL;  
      case 'gradientMapClass' : return LayerKind.GRADIENTMAP;  
      case 'gradientMapLayer' : return LayerKind.GRADIENTFILL;  
      case 'hueSaturation' : return LayerKind.HUESATURATION;  
      case 'colorLookup' : return undefined; //this does not exist and errors with getting layer kind  
      case 'colorBalance' : return LayerKind.COLORBALANCE;  
      case 'patternLayer' : return LayerKind.PATTERNFILL;  
      case 'invert' : return LayerKind.INVERSION;  
      case 'posterization' : return LayerKind.POSTERIZE;  
      case 'thresholdClassEvent' : return LayerKind.THRESHOLD;  
      case 'blackAndWhite' : return LayerKind.BLACKANDWHITE;  
      case 'selectiveColor' : return LayerKind.SELECTIVECOLOR;  
      case 'vibrance' : return LayerKind.VIBRANCE;  
      case 'brightnessEvent' : return LayerKind.BRIGHTNESSCONTRAST;  
      case  'channelMixer' : return LayerKind.CHANNELMIXER;  
      case 'curves' : return LayerKind.CURVES;  
      case 'exposure' : return LayerKind.EXPOSURE;  
      // if not one of the above adjustments return - adjustment layer type  
      default : return typeIDToStringID(desc.getList (stringIDToTypeID('adjustment')).getClass (0));  
      }  
   }  
var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID( 'layerSection' )));  
return ( layerType == 'layerSectionContent') ? LayerKind.NORMAL:undefined;  
};  
function getNormalLayers(array){  
var selectedLayers = new Array();  
for(var t in array){    
   switch(getLayerKindByIndex( Number(array[t])) ){  
       case LayerKind.NORMAL :   
       case  LayerKind.SMARTOBJECT :  
       case LayerKind.SOLIDFILL :  
       case LayerKind.TEXT : selectedLayers.push(Number(array[t])); break;  
       default : break;  
       }  
    }  
return selectedLayers;  
}  
function zeroPad(n, s) {   
   n = n.toString();   
   while (n.length < s)  n = '0' + n;   
   return n;   
};  
function SavePNG(saveFile){  
    pngSaveOptions = new PNGSaveOptions();   
activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);   
};  
function SaveTIFF(saveFile,Comp){  
tiffSaveOptions = new TiffSaveOptions();   
tiffSaveOptions.embedColorProfile = true;   
tiffSaveOptions.transparency = true;   
tiffSaveOptions.alphaChannels = true;   
tiffSaveOptions.layers = true;  
switch (Number(Comp)){  
    case 0 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW; break;  
    case 1 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFZIP; break;  
    case 2 : tiffSaveOptions.imageCompression = TIFFEncoding.JPEG; break;  
    case 3 : tiffSaveOptions.imageCompression = TIFFEncoding.NONE; break;  
    default : break;  
}  
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);   
};  
function SavePSD(saveFile){   
psdSaveOptions = new PhotoshopSaveOptions();   
psdSaveOptions.embedColorProfile = true;   
psdSaveOptions.alphaChannels = true;    
psdSaveOptions.layers = true;    
activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);   
};  
function SavePDF(saveFile){   
pdfSaveOptions = new PDFSaveOptions();   
activeDocument.saveAs(saveFile, pdfSaveOptions, true, Extension.LOWERCASE);   
};  
function SaveJPG(saveFile, jpegQuality){  
    try{  
jpgSaveOptions = new JPEGSaveOptions();  
jpgSaveOptions.embedColorProfile = true;  
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
jpgSaveOptions.matte = MatteType.NONE;  
jpgSaveOptions.quality = jpegQuality;  
activeDocument.saveAs(saveFile, jpgSaveOptions, true,Extension.LOWERCASE);  
}catch(e){$.writeln(e+" - "+e.line);}  
};  
function SaveForWeb(saveFile,jpegQuality) {  
var tmpFile=File(saveFile.path +"/tmpName.jpg");  
var sfwOptions = new ExportOptionsSaveForWeb();   
   sfwOptions.format = SaveDocumentType.JPEG;   
   sfwOptions.includeProfile = false;   
   sfwOptions.interlaced = 0;   
   sfwOptions.optimized = true;   
   sfwOptions.quality = Number(jpegQuality);   
activeDocument.exportDocument(tmpFile, ExportType.SAVEFORWEB, sfwOptions);  
tmpFile.rename(decodeURI(saveFile.name));  
}; 
