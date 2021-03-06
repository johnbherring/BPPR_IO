
var x;
var status;
var bin="0";
var Found=0;
var d;
var Length;
var Status;

var off = new Array(7);
var on = new Array(7);
var Unknown = new Array(7);
var Image_src = new Array(5);
var Image_Set = new Array(2);

var Image_Select_Flow = new Array(15);

Image_Select_Flow[0] = 0;
Image_Select_Flow[1] = 0;
Image_Select_Flow[2] = 1;
Image_Select_Flow[3] = 0;
Image_Select_Flow[4] = 0;
Image_Select_Flow[5] = 0;
Image_Select_Flow[6] = 0;
Image_Select_Flow[7] = 0;
Image_Select_Flow[8] = 0;
Image_Select_Flow[9] = 0;
Image_Select_Flow[10] = 0;
Image_Select_Flow[11] = 0;
Image_Select_Flow[12] = 0;
Image_Select_Flow[13] = 0;
Image_Select_Flow[14] = 0;
Image_Select_Flow[15] = 0;

var Image_Select_IO = new Array(15);

//These represent the IO Status Bits and "point" to the Image Set to be used for this bit See Image Set[#], this is the number in the array below

/*	Bit1  	1	Under Range					Qbit Set
	Bit2  	2	Over Range					Qbit Set
	Bit3  	4	IO Error	 				Qbit Set 
	Bit4  	8	Calibration � Value Frozen
	Bit5  	16	Undefined / Not Found		Qbit Set
	Bit6  	32	Control Inhibit				Qbit Set
	Bit7	64	Maintenance					Qbit Set
	Bit8	128	Not Used 
*/

Image_Select_IO[0] = 0;         
Image_Select_IO[1] = 0;
Image_Select_IO[2] = 4; 
Image_Select_IO[3] = 3;
Image_Select_IO[4] = 0;
Image_Select_IO[5] = 3;
Image_Select_IO[6] = 3;
Image_Select_IO[7] = 0;
Image_Select_IO[8] = 0;
Image_Select_IO[9] = 0;
Image_Select_IO[10] = 0;
Image_Select_IO[11] = 0;
Image_Select_IO[12] = 0;
Image_Select_IO[13] = 0;
Image_Select_IO[14] = 0;
Image_Select_IO[15] = 0;



function ImageSourceObj(Off,On,Unknown) {
	this.Off;
	this.On;
	this.Unknown;
}
var Image_GrnOnRedOffGryUnK = new ImageSourceObj;
var Image_RedOnGrnOffGryUnK = new ImageSourceObj;
var Image_GdCrdOnBdCrdOffEmtSltUnK = new ImageSourceObj;
var Image_BlkOnGryOffEmptyUnk = new ImageSourceObj;
var Image_RedOnGryOffEmptyUnk = new ImageSourceObj;

// Normal Status Light NO Type On=Alarm-Red Light, Off= Clear-Green Light, Unknown= "?" - Gray Light

Image_RedOnGrnOffGryUnK.Off = "./images/Clear.bmp";
Image_RedOnGrnOffGryUnK.On = "./images/Alarm.bmp";
Image_RedOnGrnOffGryUnK.Unknown = "./images/OFF.bmp";

Image_GdCrdOnBdCrdOffEmtSltUnK.Off = "./images/GoodCard.png";
Image_GdCrdOnBdCrdOffEmtSltUnK.On = "./images/BadCard.png";
Image_GdCrdOnBdCrdOffEmtSltUnK.Unknown = "./images/EmptySlot.png";

Image_GrnOnRedOffGryUnK.Off = "./images/Alarm.bmp";
Image_GrnOnRedOffGryUnK.On = "./images/Clear.bmp";
Image_GrnOnRedOffGryUnK.Unknown = "./images/OFF.bmp";

// For CI and Maintenance - BPPR IO Pages

Image_BlkOnGryOffEmptyUnk.Off = "./images/OFF.bmp";
Image_BlkOnGryOffEmptyUnk.On = "./images/Black.bmp";
Image_BlkOnGryOffEmptyUnk.Unknown = "./images/Empty.bmp";

// For IO Error - BPPR IO Pages

Image_RedOnGryOffEmptyUnk.Off = "./images/OFF.bmp";
Image_RedOnGryOffEmptyUnk.On = "./images/Alarm.bmp";
Image_RedOnGryOffEmptyUnk.Unknown = "./images/Empty.bmp"; 

Image_Set[0] = Image_RedOnGrnOffGryUnK;
Image_Set[1] = Image_GdCrdOnBdCrdOffEmtSltUnK;
Image_Set[2] = Image_GrnOnRedOffGryUnK;
Image_Set[3] = Image_BlkOnGryOffEmptyUnk;
Image_Set[4] = Image_RedOnGryOffEmptyUnk;

/*Image_src[0] = "./images/OFF.bmp";
Image_src[1] = "./images/Clear.bmp";
Image_src[2] = "./images/Alarm.bmp";
Image_src[3] = "./images/GoodCard.png";
Image_src[4] = "./images/BadCard.png";
Image_src[5] = "./images/EmptySlot.png";
*/

off[0] = Image_Set[0].Off;
on[0] =Image_Set[0].On;
Unknown[0]= Image_Set[0].Unknown;

off[1] = Image_Set[0].Off;
on[1] = Image_Set[0].On;
Unknown[1] = Image_Set[0].Unknown;

off[2] = Image_Set[1].Off;
on[2] = Image_Set[1].On;
Unknown[2] = Image_Set[1].Unknown;

off[3] = Image_Set[0].Off;
on[3] = Image_Set[0].On;
Unknown[3]= Image_Set[0].Unknown;

off[4] = Image_Set[0].Off;
on[4] = Image_Set[0].On;
Unknown[4] = Image_Set[0].Unknown;

off[5] = Image_Set[0].Off;
on[5] = Image_Set[0].On;
Unknown[5] = Image_Set[0].Unknown;

off[6] = Image_Set[0].Off;
on[6] = Image_Set[0].On;
Unknown[6] = Image_Set[0].Unknown;

off[7] = Image_Set[0].Off;
on[7] = Image_Set[0].On;
Unknown[7] = Image_Set[0].Unknown;





BitNumbTxt = new Array();

BitNumbTxtShrt= new Array(15); // Short Text Descriptions Used in Column Header Text


onerror=handleErr;
var txt="";

function handleErr(msg,url,l)
	{
		txt="There was an error on this page.\n\n";
		txt+="Error: " + msg + "\n";
		txt+="URL: " + url + "\n";
		txt+="Line: " + l + "\n\n";
		txt+="Click OK to continue.\n\n";
		alert(txt);
		return true;
	}


function InitStatus()
	{

		SelectBitArray();  // Used to parse check box array IF it is set by check boxes on the webpage..
	
	}

function SetSelectBits()
	{
		CheckBoxArray[0] = document.SelectBitsForm.SelectBits[0].checked;
		CheckBoxArray[1] = document.SelectBitsForm.SelectBits[1].checked;
		CheckBoxArray[2] = document.SelectBitsForm.SelectBits[2].checked;
		CheckBoxArray[3] = document.SelectBitsForm.SelectBits[3].checked;
		CheckBoxArray[4] = document.SelectBitsForm.SelectBits[4].checked;
		CheckBoxArray[5] = document.SelectBitsForm.SelectBits[5].checked;
		CheckBoxArray[6] = document.SelectBitsForm.SelectBits[6].checked;
		CheckBoxArray[7] = document.SelectBitsForm.SelectBits[7].checked;
	}


function StatusBits(Status, SignaldivID, CheckBoxArray_Used, Image_Select_Used) 
	{

	Status = parseInt(Status);										// Convert Status to Bits 
	var bin = Status.toString(2);
	binary = bin.split('');
	CheckBoxArray = CheckBoxArray_Used;
	Image_Select = Image_Select_Used;

	Length=0;


	for (sLoop=0;sLoop <= 15;sLoop++) 								//Parse Resulting Array of 1,0,0 into Boolean Values
		{														//Set Length of Resulting Binary Number (Needed below)

		switch(binary[sLoop])
			{
				case "1" :
					binary[sLoop]=true;
					Length=Length+1;
					break;
				case "0" :
					binary[sLoop]=false;
					Length=Length+1;
					break;
				case " ":
					break;
				default:
					break;
			}

		}

		// Mask binary (Converted Status set as Boolean to Array of Fixed Length
		// This also get the bits in the right order

	StatusBitArray = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false);

	StatusBitArrayIndex = (Length-1);			// Based Upon Length of binary start at this
											    // point and work down in StatusBitArray

	for (sLoop=0;sLoop<Length;sLoop++) 						
		{				
			StatusBitArray[StatusBitArrayIndex]=binary[sLoop];
			StatusBitArrayIndex=StatusBitArrayIndex-1;
		}

	// Update div fields in html with On, Off images..

	for(sLoop=0;sLoop <= 15;sLoop++)
		{
			Image_Set_Select = Image_Select[sLoop];
			on[sLoop] = Image_Set[Image_Set_Select].On;
			off[sLoop] = Image_Set[Image_Set_Select].Off;
			
			if (CheckBoxArray[sLoop]&StatusBitArray[sLoop])
				{
					document.getElementById(SignaldivID+sLoop).src=on[sLoop];
				}
				
			if (CheckBoxArray[sLoop]&~StatusBitArray[sLoop])
				{
					document.getElementById(SignaldivID+sLoop).src=off[sLoop];
				}
		}

	} // End function StatusBits() Create Status Bits from Status as Integer

	// Update Html

function CreateStatusLightsHtmlItems(SignaldivID,CheckBoxArray_Used,Image_Select_Used)
	{ // Close

		var table_width = 50;
		var border = 1;
		var form_name ="StatusLights";
		var input_type ="text";
		var text_field_size =1;
			
		var StatusLightsHtml = "<table width="+ table_width + "border="+"1" + " bordercolor="+ "#000000"  + " cellpadding=" + "1" + " cellspacing="+ "1" + ">" + 
								"<form name=" + form_name + ">"  + "<tr>" + "<div align="+"left"+">"; 


		StatusLightsHtml = StatusLightsHtml + "</tr>" + "<tr>";

		for (htmLoop = 0; htmLoop <= 15; htmLoop++) 
			{
				Image_Set_Select = Image_Select_Used[htmLoop];
				Unknown[htmLoop] = Image_Set[Image_Set_Select].Unknown;

				
                
                if(CheckBoxArray_Used[htmLoop])
					{

					   // alert("Image Select " + Image_Set_Select + " " + "Unknown " + Unknown[htmLoop]);
                        
                        StatusLightsHtml = StatusLightsHtml + "<td>" + "<img src=" + Unknown[htmLoop] + " alt="+ "Light " + htmLoop + " id="+SignaldivID+htmLoop+
											" style="+" padding: 0; margin: 0; height: 15; width: 15; visibility:hidden" + "/>"+"</td>";
					}
			}
		
		StatusLightsHtml = StatusLightsHtml + "</form>" + "</tr>" + "</table>";

		document.getElementById(SignaldivID).innerHTML = StatusLightsHtml;

	}	 

function CreateStatusLightsRowHeader(RowdivID,BitNumbTxtShort_Used,CheckBoxArray_Used)
	{
		var table_width = 50;
		var border = 1;
		var form_name ="StatusLights";
		var input_type ="text";
		var text_field_size = 1;

		//" style=" + "background-color:darkgray;width:20;font-weight:bold;border:1px;padding:0;margin:0>"
		//alert(BitNumbTxtShrt);
		//writing-mode:tb-lr	+ ">"
		var StatusRowHtml = "<table width="+ table_width + "border="+"1" + " bordercolor="+ "#000000"  + " cellpadding=" + "1" + " cellspacing="+ "1" + ">" +
							"<form name=" + form_name + " style=" + " padding: 0 ;margin: 0" + ">" + "<div align=" + "left" + ">" + "<tr>"; 

			for(htmLoop=0;htmLoop <= 15;htmLoop++) 				
				{		
					if(CheckBoxArray_Used[htmLoop])
						{
							StatusRowHtml = StatusRowHtml + "<td>" + "<input type="+ input_type+ " id=" + "Bit" + htmLoop + "Txt" + " value="
											+ BitNumbTxtShort_Used[htmLoop] + " size=" + text_field_size + " style=" + "background-color:darkgray;width:20;font-weight:bold;border:1px;padding:0;margin:0>"
											+ "</td>";
						}
				}

		StatusRowHtml = StatusRowHtml + "</form>" + "</tr>" + "</table>";

		//alert(StatusRowHtml);
		
		document.getElementById(RowdivID).innerHTML = StatusRowHtml;

	}  // Close CreateStatusLightsRowHeader


function CreateStatus(CheckBoxArray_Used){   // This creates the Results Status by Status Text ...

	var Found = 0;
	var Pass=true;
	var Icon = "<br>"+"<Strong>" + "Status as Text" +  "</Strong>" + "<br>" + 
	"<ul>";

	CheckBoxArray = CheckBoxArray_Used;
	
		for(sLoop=0;sLoop <= 15;sLoop++)
			{
				if (CheckBoxArray[sLoop]&StatusBitArray[sLoop])
					{
						document.StatusLights.Lights[sLoop].src =on;
						Icon = Icon + "<li>"+ BitNumbTxt[sLoop] + "</li>";	
						Found=Found+1;
					}
				
				if (CheckBoxArray[sLoop]&~StatusBitArray[sLoop])
					{
						document.StatusLights.Lights[sLoop].src =off;
					}
			}
				
		if(Found==0)
			{
				Icon = Icon + "<li>" + "No Bits"  + "</li>";	
			}
	
		Icon = Icon + "<li>"+ "Debug Check box " + d + "</li>";
		Icon = Icon + "</ul>";

		document.getElementById("Icons").innerHTML = Icon;


	} //Close Function CreateStatus HTML	


function DetectDebugCheckbox()
	{
		d = document.getElementById("debug").checked;
		if(d)
			{
				CreateDebugHtml();
			}
		else
			{
				document.getElementById("DebugField").innerHTML = " ";
				return;
			}
	}


function CreateDebugHtml(CheckBoxArray_Used) 
	{
		var DebugTxt = "<form name="+"SelectBitsForm"+ ">" +
						"<b>" + "Bit1" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit1" + " value=1" + " onclick =" + "SetSelectBits()" + ">" +
						"<b>" + "Bit2" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit2" + " value=" + 2 + " onclick =" + "SetSelectBits()" + ">" +
						"<b>" + "Bit3" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit3" + " value=" + 3 + " onclick =" + "SetSelectBits()" + ">" +
						"<b>" + "Bit4" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit4" + " value=" + 4 + " onclick =" + "SetSelectBits()" + ">" +
						"<br>"+
						"<b>" + "Bit5" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit5" + " value=" + 5 + " onclick =" + "SetSelectBits()" + ">" +
						"<b>" + "Bit6" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit6" + " value=" + 6 + " onclick =" + "SetSelectBits()" + ">" +
						"<b>" + "Bit7" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit7" + " value=" + 7 + " onclick =" + "SetSelectBits()" + ">" +	
						"<b>" + "Bit8" + "</b>" + "<input type=" + "checkbox" + " name=" + "SelectBits"  + " id =" + "Bit8" + " value=" + 8 + " onclick =" + "SetSelectBits()" + ">" +
						"</form>";


		DebugTxt = 	DebugTxt + "<br>" + "<br>" + "<Strong>" + "Debug" +  "</Strong>" + "<br>" + "<br>" + 					
					"The binary representation of " + x + " is " + bin + "<br>" + "<br>";
		BitNumb=0;

		CheckBoxArray = CheckBoxArray_Used;
		for (sLoop=0;sLoop<Length;sLoop++)
			{
				if(StatusBitArray[sLoop])
					{
						DebugTxt = DebugTxt +  "Status Bit Array[" + BitNumb + "] " + BitNumbTxt[BitNumb]+ " "  + "<br>";
					}
			BitNumb=BitNumb+1;
			}

		//DebugTxt = DebugTxt + "<br>" + "<Strong>"+ "Array of Status " + "</Strong>" + binary + "<br>" + "<br>";
		//if(Length>1)
		//	{
				//DebugTxt = DebugTxt +  "Length " + Length + " Bits" + "<br>" + "<br>";
		//	}
		//else
			//DebugTxt = DebugTxt +  "Length " + Length + " Bit" + "<br>" + "<br>";

		DebugTxt = DebugTxt + "<Strong>" + "Debug" +  "</Strong>" + "<br>" + 
		"<ul>" +
		//"<li>"+ "Binary0 " + binary[0] + " Status Bit 0 " + StatusBitArray[0] + "</li>" + 
		//"<li>"+ "Binary1 " + binary[1] + " Status Bit 1 " + StatusBitArray[1] + "</li>" + 
		//"<li>"+ "Binary2 " + binary[2] + " Status Bit 2 " + StatusBitArray[2] + "</li>" + 
		//"<li>"+ "Binary3 " + binary[3] + " Status Bit 3 " + StatusBitArray[3] + "</li>" + 
		//"<li>"+ "Binary4 " + binary[4] + " Status Bit 4 " + StatusBitArray[4] + "</li>" + 
		//"<li>"+ "Binary5 " + binary[5] + " Status Bit 5 " + StatusBitArray[5] + "</li>" + 
		//"<li>"+ "Binary6 " + binary[6] + " Status Bit 6 " + StatusBitArray[6] + "</li>" + 
		//"<li>"+ "Binary7 " + binary[7] + " Status Bit 7 " + StatusBitArray[7] + "</li>" + 

		"<li>"+ "Monitored Status Points Found " + Found + "</li>" + 
		"<li>"+ "Debug Checkbox " + d + "</li>" + 
		"<li>"+ "Bit1 Checkbox " + CheckBoxArray[0] + "</li>" + 
		"<li>"+ "Bit2 Checkbox " + CheckBoxArray[1] + "</li>" + 
		"<li>"+ "Bit3 Checkbox " + CheckBoxArray[2] + "</li>" + 
		"<li>"+ "Bit4 Checkbox " + CheckBoxArray[3] + "</li>" + 
		"<li>"+ "Bit5 Checkbox " + CheckBoxArray[4] + "</li>" + 
		"<li>"+ "Bit6 Checkbox " + CheckBoxArray[5] + "</li>" + 
		"<li>"+ "Bit7 Checkbox " + CheckBoxArray[6] + "</li>" + 
		"<li>"+ "Bit8 Checkbox " + CheckBoxArray[7] + "</li>" + 

		"</ul>";

	document.getElementById("DebugField").innerHTML = DebugTxt;

	} //Close Function CreateDebugHtml


