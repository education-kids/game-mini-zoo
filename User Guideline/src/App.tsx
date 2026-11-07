import { useEffect, useState } from "react";

const assetPathPrefix = "/assets";
const imgArtboard1Copy121001 = `${assetPathPrefix}/c99a5.png`;
const imgArtboard1Copy41001 = `${assetPathPrefix}/8fac1.png`;
const imgArtboard1Copy81001 = `${assetPathPrefix}/ac24f.png`;
const imgArtboard1Copy101001 = `${assetPathPrefix}/3eaae.png`;
const imgArtboard1Copy61001 = `${assetPathPrefix}/6907e.png`;
const imgArtboard1Copy71001 = `${assetPathPrefix}/f3667.png`;
const imgLogoPens1 = `${assetPathPrefix}/52d15.png`;
const imgRectangle = `${assetPathPrefix}/d36b5.png`;
const imgRectangle1 = `${assetPathPrefix}/ac781.png`;
const imgArtboard1Copy43 = `${assetPathPrefix}/b3423.png`;
const imgFrame = `${assetPathPrefix}/c689c.png`;
const imgRectangle2 = `${assetPathPrefix}/f3344.png`;
const imgRectangle3 = `${assetPathPrefix}/c4ce1.png`;
const imgRectangle4 = `${assetPathPrefix}/a3119.png`;
const imgImage1 = `${assetPathPrefix}/450f7.png`;
const imgImage2 = `${assetPathPrefix}/6ef04.png`;
const imgImage3 = `${assetPathPrefix}/b21ce.png`;
const imgImage4 = `${assetPathPrefix}/81ca9.png`;
const imgArtboard1Copy12 = `${assetPathPrefix}/60377.png`;
const imgArtboard1Copy7 = `${assetPathPrefix}/5d916.png`;
const imgArtboard1Copy8 = `${assetPathPrefix}/9a3c1.png`;
const imgArtboard1Copy9 = `${assetPathPrefix}/4e354.png`;
const imgArtboard1Copy10 = `${assetPathPrefix}/ceece.png`;
const imgArtboard1Copy11 = `${assetPathPrefix}/0b183.png`;
const imgG849 = `${assetPathPrefix}/0ea22.svg`;
const imgGroup316 = `${assetPathPrefix}/98f56.svg`;
const imgEllipse1 = `${assetPathPrefix}/2e061.svg`;
const imgEllipse2 = `${assetPathPrefix}/98f7b.svg`;
const imgEllipse3 = `${assetPathPrefix}/38078.svg`;
const imgEllipse4 = `${assetPathPrefix}/58b2f.svg`;
const imgEllipse5 = `${assetPathPrefix}/fcac7.svg`;
const imgEllipse6 = `${assetPathPrefix}/69cbd.svg`;
const imgEllipse7 = `${assetPathPrefix}/d22b3.svg`;
const imgEllipse8 = `${assetPathPrefix}/5908f.svg`;
const imgEllipse9 = `${assetPathPrefix}/59683.svg`;
const imgEllipse10 = `${assetPathPrefix}/33ca8.svg`;
const imgEllipse11 = `${assetPathPrefix}/ca3a3.svg`;
const imgEllipse12 = `${assetPathPrefix}/2e74a.svg`;
const imgEllipse13 = `${assetPathPrefix}/c70c6.svg`;
const imgEllipse14 = `${assetPathPrefix}/996ef.svg`;
const imgVector = `${assetPathPrefix}/6b32a.svg`;
const imgVector1 = `${assetPathPrefix}/82e11.svg`;
const imgVector2 = `${assetPathPrefix}/168dc.svg`;
const imgVector3 = `${assetPathPrefix}/5518f.svg`;
const imgVector4 = `${assetPathPrefix}/cea2c.svg`;
const imgVector5 = `${assetPathPrefix}/e4b18.svg`;
const imgVector6 = `${assetPathPrefix}/53045.svg`;
const imgVector7 = `${assetPathPrefix}/5df65.svg`;
const imgGroup = `${assetPathPrefix}/6f5ce.svg`;
const imgGroup1 = `${assetPathPrefix}/2dbea.svg`;
const imgGroup2 = `${assetPathPrefix}/9292e.svg`;
const imgGroup35 = `${assetPathPrefix}/0e9be.svg`;
const imgVector8 = `${assetPathPrefix}/0ffb5.svg`;
const imgVector9 = `${assetPathPrefix}/4a006.svg`;
const imgVector10 = `${assetPathPrefix}/b2f63.svg`;
const imgVector11 = `${assetPathPrefix}/9e6c4.svg`;
const imgVector12 = `${assetPathPrefix}/bfb32.svg`;
const imgVector13 = `${assetPathPrefix}/ee0a2.svg`;
const imgVector14 = `${assetPathPrefix}/13961.svg`;
const imgVector15 = `${assetPathPrefix}/ea079.svg`;
const imgVector16 = `${assetPathPrefix}/339b3.svg`;
const imgGroup3 = `${assetPathPrefix}/1cf55.svg`;
const imgGroup4 = `${assetPathPrefix}/0be65.svg`;
const imgGroup5 = `${assetPathPrefix}/d4c45.svg`;
const imgGroup6 = `${assetPathPrefix}/c3cc1.svg`;
const imgVector17 = `${assetPathPrefix}/81020.svg`;
const imgVector18 = `${assetPathPrefix}/b15bb.svg`;
const imgVector19 = `${assetPathPrefix}/61233.svg`;
const imgVector20 = `${assetPathPrefix}/eb6d8.svg`;
const imgVector21 = `${assetPathPrefix}/8272c.svg`;
const imgVector22 = `${assetPathPrefix}/3cef0.svg`;
const imgVector23 = `${assetPathPrefix}/291b0.svg`;
const imgGroup7 = `${assetPathPrefix}/baad0.svg`;
const imgGroup36 = `${assetPathPrefix}/14726.svg`;
const imgVector24 = `${assetPathPrefix}/a8997.svg`;
const imgVector25 = `${assetPathPrefix}/a2bee.svg`;
const imgVector26 = `${assetPathPrefix}/f2a96.svg`;
const imgVector27 = `${assetPathPrefix}/bc757.svg`;
const imgVector28 = `${assetPathPrefix}/344f6.svg`;
const imgVector29 = `${assetPathPrefix}/1492b.svg`;
const imgGroup8 = `${assetPathPrefix}/c8854.svg`;
const imgGroup9 = `${assetPathPrefix}/01685.svg`;
const imgGroup10 = `${assetPathPrefix}/29c16.svg`;
const imgVector30 = `${assetPathPrefix}/5bc0f.svg`;
const imgVector31 = `${assetPathPrefix}/2c3d8.svg`;
const imgVector32 = `${assetPathPrefix}/f4515.svg`;
const imgVector33 = `${assetPathPrefix}/50b64.svg`;
const imgVector34 = `${assetPathPrefix}/12f8e.svg`;
const imgGroup11 = `${assetPathPrefix}/f0b00.svg`;
const imgStar2 = `${assetPathPrefix}/07b08.svg`;
const imgGroup12 = `${assetPathPrefix}/38003.svg`;
const imgGroup13 = `${assetPathPrefix}/5a56d.svg`;
const imgVector35 = `${assetPathPrefix}/5a55c.svg`;
const imgGroup14 = `${assetPathPrefix}/efe97.svg`;
const imgVector36 = `${assetPathPrefix}/22aff.svg`;
const imgVector37 = `${assetPathPrefix}/5331e.svg`;
const imgGroup277 = `${assetPathPrefix}/46811.svg`;
const imgVector38 = `${assetPathPrefix}/fc849.svg`;
const imgVector39 = `${assetPathPrefix}/55272.svg`;
const imgVector40 = `${assetPathPrefix}/1eba1.svg`;
const imgGroup15 = `${assetPathPrefix}/5c1f3.svg`;
const imgVector41 = `${assetPathPrefix}/45411.svg`;
const imgVector42 = `${assetPathPrefix}/25a7d.svg`;
const imgGroup16 = `${assetPathPrefix}/f81d4.svg`;
const imgStar3 = `${assetPathPrefix}/c1938.svg`;
const imgVector43 = `${assetPathPrefix}/efa57.svg`;
const imgVector44 = `${assetPathPrefix}/cafbd.svg`;
const imgVector45 = `${assetPathPrefix}/35c6a.svg`;
const imgVector46 = `${assetPathPrefix}/aa671.svg`;
const imgVector47 = `${assetPathPrefix}/355d2.svg`;
const imgVector48 = `${assetPathPrefix}/6c00c.svg`;
const imgVector49 = `${assetPathPrefix}/c28e6.svg`;
const imgVector50 = `${assetPathPrefix}/eb01b.svg`;
const imgVector51 = `${assetPathPrefix}/42ad2.svg`;
const imgVector52 = `${assetPathPrefix}/8fee3.svg`;
const imgVector53 = `${assetPathPrefix}/149d1.svg`;
const imgVector54 = `${assetPathPrefix}/ebb14.svg`;
const imgVector55 = `${assetPathPrefix}/69703.svg`;
const imgFrame125 = `${assetPathPrefix}/3521b.svg`;
const imgGroup17 = `${assetPathPrefix}/10273.svg`;
const imgGroup18 = `${assetPathPrefix}/10069.svg`;
const imgGroup19 = `${assetPathPrefix}/984b4.svg`;
const imgGroup20 = `${assetPathPrefix}/ec47d.svg`;

function UserGuideline() {
  return (
    <div
      className="artboard relative size-full"
      data-node-id="509:2"
      style={{
        backgroundImage:
          "linear-gradient(258.7033881522325deg, rgb(168, 237, 255) 0%, rgb(255, 255, 255) 100%)",
      }}
      data-name="USER GUIDELINE"
    >
      <div
        className="absolute inset-[-1.02%_48.98%_100.31%_30%]"
        data-node-id="516:11"
        data-name="g849"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgG849} />
      </div>
      <div
        className="-translate-x-1/2 absolute bg-gradient-to-b bottom-0 from-[3.042%] from-[rgba(255,255,255,0.3)] left-1/2 to-[6.826%] to-white top-[-3.02%] w-[1500px]"
        data-node-id="509:20"
      />
      <div
        className="absolute contents h-[888.965px] left-[calc(28.57%+9.43px)] top-[-181px] w-[1162.286px]"
        data-node-id="509:19"
      >
        <div
          className="absolute flex h-[304.048px] items-center justify-center left-[calc(28.57%+78.26px)] top-[403.87px] w-[551.536px]"
          data-node-id="509:13"
        >
          <div className="flex-none rotate-[-7.66deg]">
            <div
              className="h-[236.243px] relative rounded-[30px] w-[524.739px]"
              data-name="Artboard 1 copy 12-100 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full"
                src={imgArtboard1Copy121001}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[303.978px] items-center justify-center left-[calc(64.29%+84.26px)] top-[331.17px] w-[551.743px]"
          data-node-id="509:14"
        >
          <div className="flex-none rotate-[-7.66deg]">
            <div
              className="h-[236.142px] relative rounded-[30px] w-[524.961px]"
              data-name="Artboard 1 copy 4-100 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full"
                src={imgArtboard1Copy41001}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[303.762px] items-center justify-center left-[calc(28.57%+9.43px)] top-[-108.09px] w-[551.016px]"
          data-node-id="509:15"
        >
          <div className="flex-none rotate-[-7.66deg]">
            <div
              className="h-[236.02px] relative rounded-[30px] w-[524.245px]"
              data-name="Artboard 1 copy 8-100 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full"
                src={imgArtboard1Copy81001}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[303.762px] items-center justify-center left-[calc(64.29%+15.73px)] top-[-180.95px] w-[551.016px]"
          data-node-id="509:16"
        >
          <div className="flex-none rotate-[-7.66deg]">
            <div
              className="h-[236.02px] relative rounded-[30px] w-[524.245px]"
              data-name="Artboard 1 copy 10-100 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full"
                src={imgArtboard1Copy101001}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[304.048px] items-center justify-center left-[calc(28.57%+43.81px)] top-[147.64px] w-[551.536px]"
          data-node-id="509:17"
        >
          <div className="flex-none rotate-[-7.66deg]">
            <div
              className="h-[236.243px] relative rounded-[30px] w-[524.739px]"
              data-name="Artboard 1 copy 6-100 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full"
                src={imgArtboard1Copy61001}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[303.978px] items-center justify-center left-[calc(64.29%+49.79px)] top-[74.79px] w-[551.743px]"
          data-node-id="509:18"
        >
          <div className="flex-none rotate-[-7.66deg]">
            <div
              className="h-[236.142px] relative rounded-[30px] w-[524.961px]"
              data-name="Artboard 1 copy 7-100 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full"
                src={imgArtboard1Copy71001}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[731px] items-center justify-center left-0 top-0 w-[1500px]"
        data-node-id="509:21"
      >
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="bg-gradient-to-b from-[33.752%] from-[rgba(255,255,255,0.3)] h-[1500px] relative to-[67.592%] to-white w-[731px]" />
        </div>
      </div>
      <div className="absolute contents left-[84px] top-[346px]" data-node-id="515:9">
        <div
          className="absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[142px] left-[calc(7.14%-18.14px)] top-[352px] w-[888px]"
          data-node-id="509:40"
        />
        <div className="absolute contents left-[84px] top-[346px]" data-node-id="509:73">
          <div
            className="absolute bg-[#107afd] left-[84px] size-[11px] top-[488px]"
            data-node-id="509:69"
          />
          <div
            className="absolute bg-[#107afd] left-[84px] size-[11px] top-[346px]"
            data-node-id="509:70"
          />
          <div
            className="absolute bg-[#107afd] left-[calc(64.29%+6.71px)] size-[11px] top-[488px]"
            data-node-id="509:71"
          />
          <div
            className="absolute bg-[#107afd] left-[calc(64.29%+6.71px)] size-[11px] top-[346px]"
            data-node-id="509:72"
          />
        </div>
        <div
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[0] left-[calc(7.14%+1.86px)] not-italic text-[#107afd] text-[45.002px] text-shadow-[0px_0px_2px_rgba(0,0,0,0.4)] top-[369px] w-[848px]"
          data-node-id="509:38"
        >
          <p className="leading-[1.2] mb-0">DESAIN RANCANGAN UI KIT MODULAR</p>
          <p className="font-['Poppins:Regular'] leading-[1.2] text-black">{`UNTUK GAME EDUKASI ANAK `}</p>
        </div>
      </div>
      <div
        className="absolute h-[89px] left-[calc(14.29%+79.36px)] top-[138px] w-[87.761px]"
        data-node-id="516:17"
        data-name="logo pens 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgLogoPens1}
        />
      </div>
      <div className="absolute inset-[0.79%_81.99%_98.71%_12.76%]" data-node-id="516:24">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup316} />
      </div>
      <div
        className="-translate-x-1/2 [word-break:break-word] absolute contents left-[calc(50%-1px)] not-italic text-[#565656] top-[calc(5%+398.56px)]"
        data-node-id="515:5"
      >
        <p
          className="absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-57px)] text-[26px] top-[calc(5%+398.56px)] whitespace-nowrap"
          data-node-id="510:2"
        >
          Tentang
        </p>
        <p
          className="-translate-x-1/2 absolute font-['Poppins:Medium'] h-[123px] leading-[1.3] left-[calc(50%-1px)] text-[24px] text-center top-[calc(5%+489.56px)] w-[1102px]"
          data-node-id="510:3"
        >
          Dokumentasi ini merupakan panduan penggunaan UI Kit Modular untuk pengembangan antarmuka
          game edukasi anak. Panduan ini bertujuan untuk memastikan konsistensi visual dan
          fungsionalitas komponen, baik pada tahap desain di Figma maupun saat diimplementasikan ke
          dalam game engine (Unity).
        </p>
      </div>
      <div
        className="absolute contents left-[calc(14.29%-11.29px)] top-[calc(10%+525.66px)]"
        data-node-id="520:6"
      >
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-82px)] not-italic text-[#565656] text-[26px] top-[calc(10%+525.66px)] whitespace-nowrap"
          data-node-id="510:7898"
        >
          Palet Warna
        </p>
        <div
          className="-translate-x-1/2 absolute border border-[#565656] border-solid content-stretch flex items-center justify-center left-[calc(21.43%-10.93px)] px-[20px] py-[10px] rounded-[34px] top-[calc(10%+616.66px)]"
          data-node-id="510:7902"
        >
          <p
            className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
            data-node-id="510:7903"
          >
            Bubble Button
          </p>
        </div>
        <div
          className="absolute content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[10.682px] items-center leading-[0] left-[calc(14.29%-5.29px)] top-[calc(10%+725.66px)]"
          data-node-id="511:8041"
        >
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8040"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:7960"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse1}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[25.81px] mt-[52.52px] not-italic relative row-1 text-[#fb5252] text-[17.803px] text-justify whitespace-nowrap"
              data-node-id="511:8027"
            >
              #F8B13F
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8039"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:7961"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse2}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[22.25px] mt-[52.52px] not-italic relative row-1 text-[17.803px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8028"
            >
              #20B2E0
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8038"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:7962"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse3}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[22.25px] mt-[52.52px] not-italic relative row-1 text-[17.803px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8029"
            >
              #2A98E2
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8037"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:7963"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse4}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[26.7px] mt-[52.52px] not-italic relative row-1 text-[#fd7b95] text-[17.803px] text-justify whitespace-nowrap"
              data-node-id="511:8030"
            >
              #B1E21D
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8036"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:7964"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse5}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[21.36px] mt-[52.52px] not-italic relative row-1 text-[17.803px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8031"
            >
              #3BBC37
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8035"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:7965"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse6}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[22.25px] mt-[52.52px] not-italic relative row-1 text-[#e1ff00] text-[17.803px] text-justify whitespace-nowrap"
              data-node-id="511:8032"
            >
              #FD7B95
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8073"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:8074"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse7}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[23.14px] mt-[52.52px] not-italic relative row-1 text-[17.803px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8075"
            >
              #FB5252
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8034"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[126.403px]"
              data-node-id="511:8025"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse8}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[23.14px] mt-[52.52px] not-italic relative row-1 text-[17.803px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8033"
            >
              #FB5252
            </p>
          </div>
        </div>
        <div
          className="-translate-x-1/2 absolute border border-[#565656] border-solid content-stretch flex items-center justify-center left-[calc(17.86%+22.64px)] px-[20px] py-[10px] rounded-[34px] top-[calc(15%+33.16px)]"
          data-node-id="511:8045"
        >
          <p
            className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
            data-node-id="511:8046"
          >
            Flat Button
          </p>
        </div>
        <div
          className="absolute content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[14.289px] items-center leading-[0] left-[calc(14.29%-5.29px)] top-[calc(15%+142.16px)]"
          data-node-id="511:8047"
        >
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8048"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[169.092px]"
              data-node-id="511:8049"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse9}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[34.53px] mt-[70.26px] not-italic relative row-1 text-[23.816px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8050"
            >
              #F69021
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8051"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[169.092px]"
              data-node-id="511:8052"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse10}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[29.77px] mt-[70.26px] not-italic relative row-1 text-[23.816px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8053"
            >
              #70C05A
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8054"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[169.092px]"
              data-node-id="511:8055"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse11}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[29.77px] mt-[70.26px] not-italic relative row-1 text-[23.816px] text-justify text-white whitespace-nowrap"
              data-node-id="511:8056"
            >
              #4994D1
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8057"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[169.092px]"
              data-node-id="511:8058"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse12}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[30.96px] mt-[70.26px] not-italic relative row-1 text-[#e1ff00] text-[23.816px] text-justify whitespace-nowrap"
              data-node-id="511:8059"
            >
              #F05E93
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8060"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[169.092px]"
              data-node-id="511:8061"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse13}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[28.58px] mt-[70.26px] not-italic relative row-1 text-[23.816px] text-[red] text-justify whitespace-nowrap"
              data-node-id="511:8062"
            >
              #FAD902
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
            data-node-id="511:8063"
          >
            <div
              className="col-1 ml-0 mt-0 relative row-1 size-[169.092px]"
              data-node-id="511:8064"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgEllipse14}
              />
            </div>
            <p
              className="[word-break:break-word] col-1 font-['Poppins:SemiBold'] leading-[1.2] ml-[22.62px] mt-[70.26px] not-italic relative row-1 text-[23.816px] text-black text-justify whitespace-nowrap"
              data-node-id="511:8065"
            >
              #C4C4C4
            </p>
          </div>
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute contents left-[calc(50%-1px)] top-[844px]"
        data-node-id="515:6"
      >
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] h-[49.129px] leading-[1.2] left-[calc(50%-61px)] not-italic text-[#565656] text-[26px] top-[844px] w-[121px]"
          data-node-id="509:75"
        >
          Daftar isi
        </p>
        <div
          className="-translate-x-1/2 absolute content-center drop-shadow-[0px_2px_4px_rgba(0,0,0,0.4)] flex flex-wrap gap-[30px_24.811px] h-[174.327px] items-center justify-center left-[calc(50%-1px)] top-[calc(5%+74.23px)] w-[1064px]"
          data-node-id="509:94"
        >
          <div
            className="bg-[#f8b13f] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:80"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:81"
            >
              Tentang
            </p>
          </div>
          <div
            className="bg-[#20b2e0] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:77"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:76"
            >
              Filosofi Desain
            </p>
          </div>
          <div
            className="bg-[#b1e21d] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:78"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:79"
            >
              Palet Warna
            </p>
          </div>
          <div
            className="bg-[#fb5252] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:82"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:83"
            >
              Kondisi Tombol
            </p>
          </div>
          <div
            className="bg-[#ff9191] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:84"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:85"
            >
              Panduan Warna
            </p>
          </div>
          <div
            className="bg-[#70c05a] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="519:250"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="519:251"
            >
              Panduan Font
            </p>
          </div>
          <div
            className="bg-[#c4c4c4] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:86"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:87"
            >
              Aturan Penggunaan
            </p>
          </div>
          <div
            className="bg-[#4994d1] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:88"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:89"
            >
              Ikon
            </p>
          </div>
          <div
            className="bg-[#fad902] border-[1.395px] border-solid border-white content-stretch flex items-center justify-center px-[20.929px] py-[6.976px] relative rounded-[29.999px] shrink-0"
            data-node-id="509:91"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[22.325px] text-white whitespace-nowrap"
              data-node-id="509:92"
            >{`Penggunaan di Figma & Unity`}</p>
          </div>
        </div>
      </div>
      <div
        className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(15%+461.25px)]"
        data-node-id="515:2"
      >
        <p
          className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(7.14%+642.36px)] not-italic text-[#565656] text-[26px] text-center top-[calc(15%+461.25px)] w-[1199px]"
          data-node-id="511:8087"
        >
          Kondisi Tombol
        </p>
        <div
          className="absolute border border-[#565656] border-solid content-stretch flex items-center justify-center left-[calc(14.29%-12.29px)] px-[20px] py-[10px] rounded-[34px] top-[calc(15%+552.25px)]"
          data-node-id="511:8090"
        >
          <p
            className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
            data-node-id="511:8091"
          >
            Bubble Button
          </p>
        </div>
        <div
          className="absolute contents left-[calc(14.29%-12.29px)] top-[calc(15%+661.25px)]"
          data-node-id="513:11207"
        >
          <div
            className="-translate-x-1/2 [word-break:break-word] absolute contents font-['Poppins:Medium'] leading-[1.2] left-[calc(75%+8px)] not-italic text-[#565656] text-[20px] text-center top-[calc(15%+765.25px)]"
            data-node-id="512:11146"
          >
            <p
              className="-translate-x-1/2 absolute h-[28px] left-[calc(67.86%-4.86px)] top-[calc(15%+765.25px)] w-[90px]"
              data-node-id="512:11139"
            >
              Enable
            </p>
            <p
              className="-translate-x-1/2 absolute h-[43px] left-[calc(75%+9px)] top-[calc(15%+765.25px)] w-[90px]"
              data-node-id="512:11140"
            >
              Hover/Pressed
            </p>
            <p
              className="-translate-x-1/2 absolute h-[28px] left-[calc(82.14%+20.86px)] top-[calc(15%+765.25px)] w-[90px]"
              data-node-id="512:11141"
            >
              Disable
            </p>
          </div>
          <div
            className="absolute content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[32px] items-center left-[calc(14.29%-12.29px)] top-[calc(15%+661.25px)]"
            data-node-id="511:8172"
          >
            <div
              className="border-[7.312px] border-solid border-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.25)] flex gap-[10.625px] h-[81px] items-center justify-center px-[36.559px] py-[12.796px] relative rounded-[63px] shrink-0 w-[382.118px]"
              data-node-id="512:11059"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 382.12 81' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.7471e-15 -3.8323 19.809 -1.2877e-15 191.06 40.5)'><stop stop-color='rgba(17,163,249,0)' offset='0.50481'/><stop stop-color='rgba(25,120,201,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(180deg, rgb(124, 207, 249) 0%, rgb(10, 132, 218) 100%)",
              }}
            >
              <p
                className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[36.989px] text-shadow-[0px_0px_4px_rgba(0,0,0,0.5)] text-white whitespace-nowrap"
                data-node-id="512:11060"
              >
                Enabled
              </p>
              <div
                className="absolute bottom-[-3.656px] h-[76.75399999999999px] left-[1.66px] pointer-events-none top-[0.59px]"
                data-node-id="512:11061"
              >
                <div className="contents pointer-events-auto sticky top-0">
                  <div
                    className="absolute bottom-[53.96px] left-[5.31px] top-[4.25px] w-[43.062px]"
                    data-node-id="512:11062"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute bottom-[46.3px] left-[5.31px] top-[4.25px] w-[52.631px]"
                    data-node-id="512:11063"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="border-[7.312px] border-solid border-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.25)] flex gap-[10.625px] h-[81px] items-center justify-center px-[36.559px] py-[12.796px] relative rounded-[63px] shrink-0 w-[320.118px]"
              data-node-id="512:11064"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 320.12 81' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.4636e-15 -3.8323 16.595 -1.2877e-15 160.06 40.5)'><stop stop-color='rgba(17,163,249,0.5)' offset='0.50481'/><stop stop-color='rgba(26,122,185,0.75)' offset='0.7524'/><stop stop-color='rgba(34,81,121,1)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(47, 115, 150) 0%, rgb(47, 115, 150) 100%)",
              }}
            >
              <p
                className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[34.839px] text-shadow-[0px_0px_4px_rgba(0,0,0,0.5)] text-white whitespace-nowrap"
                data-node-id="512:11065"
              >
                Hover/Pressed
              </p>
              <div
                className="absolute bottom-[-3.656px] h-[76.75399999999999px] left-[1.66px] pointer-events-none top-[0.59px]"
                data-node-id="512:11066"
              >
                <div className="contents pointer-events-auto sticky top-0">
                  <div
                    className="absolute bottom-[53.96px] left-[5.31px] top-[4.25px] w-[43.062px]"
                    data-node-id="512:11067"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute bottom-[46.3px] left-[5.31px] top-[4.25px] w-[52.631px]"
                    data-node-id="512:11068"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
              data-node-id="512:11082"
            >
              <div
                className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                data-node-id="512:11083"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector}
                />
              </div>
              <div
                className="col-1 h-[72.703px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.482px]"
                data-node-id="512:11084"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector1}
                />
              </div>
              <div
                className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                data-node-id="512:11085"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-0.97%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector2} />
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                data-node-id="512:11086"
              >
                <div
                  className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                  data-node-id="512:11087"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                      src={imgRectangle}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                  data-node-id="512:11088"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                      src={imgRectangle1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
              data-node-id="512:11089"
            >
              <div
                className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                data-node-id="512:11090"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector3}
                />
              </div>
              <div
                className="col-1 h-[72.703px] ml-[6.93px] mt-[6.65px] relative row-1 w-[75.482px]"
                data-node-id="512:11091"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector4}
                />
              </div>
              <div
                className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                data-node-id="512:11092"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-0.97%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector2} />
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                data-node-id="512:11093"
              >
                <div
                  className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                  data-node-id="512:11094"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                      src={imgRectangle}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                  data-node-id="512:11095"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                      src={imgRectangle1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
              data-node-id="512:11099"
            >
              <div
                className="col-1 h-[72.313px] ml-[6.34px] mt-[6.34px] relative row-1 w-[74.851px]"
                data-node-id="512:11100"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector5}
                />
              </div>
              <div
                className="col-1 h-[71.679px] ml-[6.34px] mt-[7.61px] relative row-1 w-[74.851px]"
                data-node-id="512:11101"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector6}
                />
              </div>
              <div
                className="col-1 h-[85px] ml-0 mt-0 relative row-1 w-[87.537px]"
                data-node-id="512:11102"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-1.06%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector7} />
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.57px] mt-[6.57px] place-items-start relative row-1"
                data-node-id="512:11103"
              >
                <div
                  className="col-1 h-[23px] ml-0 mt-0 relative row-1 w-[36.964px]"
                  data-node-id="512:11104"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                      src={imgRectangle}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[29.571px] ml-0 mt-0 relative row-1 w-[45.178px]"
                  data-node-id="512:11105"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                      src={imgRectangle1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute border border-[#565656] border-solid content-stretch flex items-center justify-center left-[calc(14.29%-12.29px)] px-[20px] py-[10px] rounded-[34px] top-[calc(20%-10.65px)]"
          data-node-id="511:11056"
        >
          <p
            className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
            data-node-id="511:11057"
          >
            Flat Button
          </p>
        </div>
        <div
          className="absolute contents left-[calc(14.29%-12.29px)] top-[calc(20%+98.35px)]"
          data-node-id="513:11206"
        >
          <div
            className="-translate-x-1/2 [word-break:break-word] absolute contents font-['Poppins:Medium'] leading-[1.2] left-[calc(75%+8px)] not-italic text-[#565656] text-[20px] text-center top-[calc(20%+204.35px)]"
            data-node-id="512:11145"
          >
            <p
              className="-translate-x-1/2 absolute h-[28px] left-[calc(67.86%-4.86px)] top-[calc(20%+204.35px)] w-[90px]"
              data-node-id="512:11142"
            >
              Enable
            </p>
            <p
              className="-translate-x-1/2 absolute h-[43px] left-[calc(75%+9px)] top-[calc(20%+204.35px)] w-[90px]"
              data-node-id="512:11143"
            >
              Hover/Pressed
            </p>
            <p
              className="-translate-x-1/2 absolute h-[28px] left-[calc(82.14%+20.86px)] top-[calc(20%+204.35px)] w-[90px]"
              data-node-id="512:11144"
            >
              Disable
            </p>
          </div>
          <div
            className="absolute content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[29px] items-center left-[calc(14.29%-12.29px)] top-[calc(20%+98.35px)]"
            data-node-id="511:11055"
          >
            <div
              className="bg-[#f58f20] border-2 border-solid border-white content-stretch drop-shadow-[0px_8px_0px_#d57827] flex h-[81px] items-center justify-center px-[126px] py-[12.194px] relative rounded-[62.163px] shrink-0"
              data-node-id="511:8173"
            >
              <p
                className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[34px] text-shadow-[0px_0px_2px_rgba(0,0,0,0.5)] text-white whitespace-nowrap"
                data-node-id="511:8174"
              >
                Enabled
              </p>
            </div>
            <div
              className="bg-[#9f6835] border-2 border-solid border-white content-stretch drop-shadow-[0px_8px_0px_#80532d] flex h-[81px] items-center justify-center px-[34.839px] py-[12.194px] relative rounded-[62.163px] shrink-0"
              data-node-id="511:8238"
            >
              <p
                className="[word-break:break-word] font-['Poppins:Bold'] leading-[normal] not-italic relative shrink-0 text-[34px] text-shadow-[0px_0px_2px_rgba(0,0,0,0.5)] text-white whitespace-nowrap"
                data-node-id="511:8239"
              >
                Hover/Pressed
              </p>
            </div>
            <div
              className="h-[88px] relative shrink-0 w-[91.826px]"
              data-node-id="511:11045"
              data-name="Group"
            >
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
            </div>
            <div
              className="h-[88px] relative shrink-0 w-[91.826px]"
              data-node-id="511:11050"
              data-name="Group"
            >
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
            </div>
            <div
              className="h-[85px] relative shrink-0 w-[88.696px]"
              data-node-id="511:9668"
              data-name="Group"
            >
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
            </div>
          </div>
        </div>
        <div
          className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(20%+307.35px)]"
          data-node-id="513:11218"
        >
          <div
            className="-translate-x-1/2 [word-break:break-word] absolute contents leading-[0] left-[calc(50%-1px)] text-[#565656] text-[20px] text-justify top-[calc(20%+360.35px)]"
            data-node-id="513:11211"
          >
            <p
              className="absolute font-['Poppins:Medium'] h-[54px] left-[calc(50%-549px)] not-italic top-[calc(20%+360.35px)] w-[1096px]"
              data-node-id="512:11097"
            >
              <span className="font-['Poppins:Bold_Italic'] italic leading-[1.2]">Enabled:</span>
              <span className="leading-[1.2]">{` Kondisi normal saat tombol siap untuk ditekan. Menggunakan warna dasar yang cerah dan saturasi tinggi untuk menarik perhatian pemain.`}</span>
            </p>
            <p
              className="absolute font-['Poppins:Medium'] h-[78px] left-[calc(50%-549px)] not-italic top-[calc(20%+444.35px)] w-[1096px]"
              data-node-id="512:11098"
            >
              <span className="font-['Poppins:Bold_Italic'] italic leading-[1.2]">{`Hover/Pressed: `}</span>
              <span className="leading-[1.2]">{`Kondisi saat kursor berada di atas tombol, atau saat tombol sedang ditekan. Menggunakan turunan warna yang lebih gelap (darker shade) dari warna dasar. Pada Bubble Button, state ini memberikan ilusi bahwa tombol sedang "ditekan masuk" ke dalam.`}</span>
            </p>
            <p
              className="absolute font-['Poppins:Bold_Italic'] h-[54px] italic left-[calc(50%-549px)] top-[calc(20%+552.35px)] w-[1096px]"
              data-node-id="513:11204"
            >
              <span className="leading-[1.2]">{`Disabled: `}</span>
              <span className="font-['Poppins:Medium'] leading-[1.2] not-italic">
                Kondisi saat aksi atau fitur pada tombol tidak tersedia/terkunci. Selalu
                direpresentasikan dengan warna Abu-abu (Grey). Tombol tidak akan merespon interaksi
                dari pemain.
              </span>
            </p>
          </div>
          <div
            className="-translate-x-1/2 absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[327px] left-[calc(50%-0.5px)] top-[calc(20%+319.35px)] w-[1175px]"
            data-node-id="513:11208"
          />
          <div
            className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(20%+307.35px)]"
            data-node-id="513:11217"
          >
            <div
              className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(20%+307.35px)]"
              data-node-id="513:11213"
            />
            <div
              className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(20%+634.35px)]"
              data-node-id="513:11214"
            />
            <div
              className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(20%+307.35px)]"
              data-node-id="513:11215"
            />
            <div
              className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(20%+634.35px)]"
              data-node-id="513:11216"
            />
          </div>
        </div>
      </div>
      <div
        className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(5%+762.56px)]"
        data-node-id="515:4"
      >
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-97px)] not-italic text-[#565656] text-[26px] top-[calc(5%+762.56px)] whitespace-nowrap"
          data-node-id="510:4"
        >
          Filosofi Desain
        </p>
        <div
          className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(5%+853.56px)]"
          data-node-id="513:11411"
        >
          <div
            className="-translate-x-1/2 absolute content-stretch flex gap-[120px] items-start left-[calc(50%-1px)] top-[calc(10%+21.66px)]"
            data-node-id="510:7897"
          >
            <div
              className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[486px]"
              data-node-id="510:7892"
            >
              <div
                className="border border-[#565656] border-solid content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[34px] shrink-0"
                data-node-id="510:5041"
              >
                <p
                  className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
                  data-node-id="510:5040"
                >
                  Bubble Button
                </p>
              </div>
              <div
                className="content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[31px] items-center leading-[0] relative shrink-0 w-full"
                data-node-id="510:4975"
              >
                <div
                  className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                  data-node-id="510:4976"
                >
                  <div
                    className="col-1 h-[95.179px] ml-0 mt-0 relative row-1 w-[98.247px]"
                    data-node-id="510:4977"
                  >
                    <div className="absolute inset-[0_0_-0.97%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup35} />
                    </div>
                  </div>
                  <div
                    className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7.36px] mt-[7.36px] place-items-start relative row-1"
                    data-node-id="510:4981"
                  >
                    <div
                      className="col-1 h-[25.754px] ml-0 mt-0 relative row-1 w-[41.39px]"
                      data-node-id="510:4982"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                          src={imgRectangle}
                        />
                      </div>
                    </div>
                    <div
                      className="col-1 h-[33.112px] ml-0 mt-0 relative row-1 w-[50.588px]"
                      data-node-id="510:4983"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                          src={imgRectangle1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                  data-node-id="510:4984"
                >
                  <div
                    className="col-1 h-[80.471px] ml-[7.36px] mt-[7.36px] relative row-1 w-[83.631px]"
                    data-node-id="510:4985"
                    data-name="Vector"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgVector8}
                    />
                  </div>
                  <div
                    className="col-1 h-[80.462px] ml-[7.1px] mt-[7.36px] relative row-1 w-[83.538px]"
                    data-node-id="510:4986"
                    data-name="Vector"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgVector9}
                    />
                  </div>
                  <div
                    className="col-1 h-[95.179px] ml-0 mt-0 relative row-1 w-[98.247px]"
                    data-node-id="510:4987"
                    data-name="Vector"
                  >
                    <div className="absolute inset-[0_0_-0.97%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgVector10} />
                    </div>
                  </div>
                  <div
                    className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7.36px] mt-[7.36px] place-items-start relative row-1"
                    data-node-id="510:4988"
                  >
                    <div
                      className="col-1 h-[25.754px] ml-0 mt-0 relative row-1 w-[41.39px]"
                      data-node-id="510:4989"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                          src={imgRectangle}
                        />
                      </div>
                    </div>
                    <div
                      className="col-1 h-[33.112px] ml-0 mt-0 relative row-1 w-[50.588px]"
                      data-node-id="510:4990"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                          src={imgRectangle1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                  data-node-id="510:4991"
                >
                  <div
                    className="col-1 h-[80.471px] ml-[7.36px] mt-[7.36px] relative row-1 w-[83.631px]"
                    data-node-id="510:4992"
                    data-name="Vector"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgVector11}
                    />
                  </div>
                  <div
                    className="col-1 h-[80.462px] ml-[7.36px] mt-[7.36px] relative row-1 w-[83.538px]"
                    data-node-id="510:4993"
                    data-name="Vector"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgVector12}
                    />
                  </div>
                  <div
                    className="col-1 h-[95.179px] ml-0 mt-0 relative row-1 w-[98.247px]"
                    data-node-id="510:4994"
                    data-name="Vector"
                  >
                    <div className="absolute inset-[0_0_-0.97%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgVector13} />
                    </div>
                  </div>
                  <div
                    className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7.36px] mt-[7.36px] place-items-start relative row-1"
                    data-node-id="510:4995"
                  >
                    <div
                      className="col-1 h-[25.754px] ml-0 mt-0 relative row-1 w-[41.39px]"
                      data-node-id="510:4996"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                          src={imgRectangle}
                        />
                      </div>
                    </div>
                    <div
                      className="col-1 h-[33.112px] ml-0 mt-0 relative row-1 w-[50.588px]"
                      data-node-id="510:4997"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                          src={imgRectangle1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                  data-node-id="510:4998"
                >
                  <div
                    className="col-1 h-[80.471px] ml-[7.36px] mt-[7.36px] relative row-1 w-[83.631px]"
                    data-node-id="510:4999"
                    data-name="Vector"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgVector14}
                    />
                  </div>
                  <div
                    className="col-1 h-[80.462px] ml-[7.36px] mt-[7.36px] relative row-1 w-[83.538px]"
                    data-node-id="510:5000"
                    data-name="Vector"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgVector15}
                    />
                  </div>
                  <div
                    className="col-1 h-[95.179px] ml-0 mt-0 relative row-1 w-[98.247px]"
                    data-node-id="510:5001"
                    data-name="Vector"
                  >
                    <div className="absolute inset-[0_0_-0.97%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgVector16} />
                    </div>
                  </div>
                  <div
                    className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[7.36px] mt-[7.36px] place-items-start relative row-1"
                    data-node-id="510:5002"
                  >
                    <div
                      className="col-1 h-[25.754px] ml-0 mt-0 relative row-1 w-[41.39px]"
                      data-node-id="510:5003"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                          src={imgRectangle}
                        />
                      </div>
                    </div>
                    <div
                      className="col-1 h-[33.112px] ml-0 mt-0 relative row-1 w-[50.588px]"
                      data-node-id="510:5004"
                      data-name="Rectangle"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                          src={imgRectangle1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Poppins:Medium'] h-[102px] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[min-content]"
                data-node-id="510:6"
              >{`Gaya 3D (highlight & shadow) yang playful dan meniru objek fisik. Memberikan affordance yang kuat. Cocok untuk gameplay utama.`}</p>
            </div>
            <div
              className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[486px]"
              data-node-id="510:7891"
            >
              <div
                className="border border-[#565656] border-solid content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[34px] shrink-0"
                data-node-id="510:7888"
              >
                <p
                  className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
                  data-node-id="510:7889"
                >
                  Flat Button
                </p>
              </div>
              <div
                className="content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[32px] items-center relative shrink-0 w-full"
                data-node-id="510:7887"
              >
                <div
                  className="h-[93.114px] relative shrink-0 w-[97.163px]"
                  data-node-id="510:7861"
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup3}
                  />
                </div>
                <div
                  className="h-[93.114px] relative shrink-0 w-[97.163px]"
                  data-node-id="510:7851"
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup4}
                  />
                </div>
                <div
                  className="h-[93.114px] relative shrink-0 w-[97.163px]"
                  data-node-id="510:7846"
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup5}
                  />
                </div>
                <div
                  className="h-[93.114px] relative shrink-0 w-[97.163px]"
                  data-node-id="510:7856"
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup6}
                  />
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Poppins:Medium'] h-[78px] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[min-content]"
                data-node-id="510:7890"
              >
                Gaya minimalis, clean, dan modern. Cocok untuk menu sekunder, settings, atau UI yang
                lebih padat.
              </p>
            </div>
          </div>
          <div
            className="-translate-x-1/2 absolute contents left-[calc(50%-0.5px)] top-[calc(5%+853.56px)]"
            data-node-id="513:11339"
          >
            <div
              className="-translate-x-1/2 absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[377px] left-[calc(50%-0.5px)] top-[calc(10%-13.34px)] w-[1175px]"
              data-node-id="513:11344"
            />
            <div
              className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(5%+853.56px)]"
              data-node-id="513:11345"
            >
              <div
                className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(5%+853.56px)]"
                data-node-id="513:11346"
              />
              <div
                className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(10%+351.66px)]"
                data-node-id="513:11347"
              />
              <div
                className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(5%+853.56px)]"
                data-node-id="513:11348"
              />
              <div
                className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(10%+351.66px)]"
                data-node-id="513:11349"
              />
            </div>
          </div>
          <div
            className="-translate-x-1/2 absolute h-[373.5px] left-1/2 top-[calc(10%-10.34px)] w-0"
            data-node-id="513:11410"
          >
            <div className="absolute inset-[0_-1px]">
              <img alt="" className="block max-w-none size-full" src={imgVector17} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(20%+808.35px)]"
        data-node-id="514:12053"
      >
        <p
          className="[word-break:break-word] absolute font-['Poppins:Medium'] h-[54px] leading-[1.2] left-[calc(50%-549px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(25%+20.45px)] w-[1096px]"
          data-node-id="513:11205"
        >
          Penggunaan warna pada UI Kit ini tidak sekadar untuk estetika, tetapi memiliki arti
          fungsional (semantik) untuk membimbing pemain anak-anak dalam mengambil keputusan:
        </p>
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-110px)] not-italic text-[#565656] text-[26px] top-[calc(20%+808.35px)] whitespace-nowrap"
          data-node-id="513:11147"
        >
          Panduan Warna
        </p>
        <div
          className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(25%+134.45px)]"
          data-node-id="513:11456"
        >
          <div
            className="absolute content-stretch flex gap-[113px] items-center leading-[0] left-[calc(14.29%-16.29px)] top-[calc(25%+178.45px)]"
            data-node-id="513:11434"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="513:11337"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="513:11242"
              >
                <div
                  className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                  data-node-id="513:11243"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector18}
                  />
                </div>
                <div
                  className="col-1 h-[72.703px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.482px]"
                  data-node-id="513:11244"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector19}
                  />
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11245"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11246"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11247"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11248"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector20} />
                  </div>
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[113.77px] mt-0 place-items-start relative row-1"
                data-node-id="513:11249"
              >
                <div
                  className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                  data-node-id="513:11250"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector21}
                  />
                </div>
                <div
                  className="col-1 h-[72.703px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.482px]"
                  data-node-id="513:11251"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector22}
                  />
                </div>
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11252"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector23} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11253"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11254"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11255"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 h-[86px] ml-[227.54px] mt-0 relative row-1 w-[89.739px]"
                data-node-id="511:8434"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup7}
                />
              </div>
            </div>
            <div
              className="[word-break:break-word] font-['Poppins:Regular'] not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[672px]"
              data-node-id="513:11423"
            >
              <p className="font-['Poppins:SemiBold'] leading-[1.3] mb-0">
                Aksi Positif / Melanjutkan.
              </p>
              <p className="leading-[1.3]">
                Gunakan untuk tombol Play, Yes, Confirm, Submit, atau Next.
              </p>
            </div>
          </div>
          <div
            className="-translate-x-1/2 absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[150px] left-[calc(50%-0.5px)] top-[calc(25%+146.45px)] w-[1175px]"
            data-node-id="513:11417"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(25%+134.45px)]"
            data-node-id="513:11419"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(25%+284.45px)]"
            data-node-id="513:11435"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(25%+284.45px)]"
            data-node-id="513:11437"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(25%+134.45px)]"
            data-node-id="513:11436"
          />
        </div>
        <div
          className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(25%+368.45px)]"
          data-node-id="513:11455"
        >
          <div
            className="absolute content-stretch flex gap-[111px] items-center leading-[0] left-[calc(14.29%-13.29px)] top-[calc(25%+412.45px)]"
            data-node-id="513:11453"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="513:11336"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="513:11220"
              >
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11221"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup36} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11225"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11226"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11227"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[113.77px] mt-0 place-items-start relative row-1"
                data-node-id="513:11228"
              >
                <div
                  className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                  data-node-id="513:11229"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector24}
                  />
                </div>
                <div
                  className="col-1 h-[72.703px] ml-[6.42px] mt-[6.65px] relative row-1 w-[75.482px]"
                  data-node-id="513:11230"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector25}
                  />
                </div>
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11231"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector26} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11232"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11233"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11234"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[227.54px] mt-0 place-items-start relative row-1"
                data-node-id="513:11235"
              >
                <div
                  className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                  data-node-id="513:11236"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector27}
                  />
                </div>
                <div
                  className="col-1 h-[72.703px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.482px]"
                  data-node-id="513:11237"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector28}
                  />
                </div>
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11238"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector29} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11239"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11240"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11241"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 h-[86px] ml-[229.48px] mt-[106px] relative row-1 w-[89.739px]"
                data-node-id="511:8274"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup8}
                />
              </div>
              <div
                className="col-1 h-[86px] ml-0 mt-[106px] relative row-1 w-[89.739px]"
                data-node-id="511:8594"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup9}
                />
              </div>
              <div
                className="col-1 h-[86px] ml-[114.74px] mt-[106px] relative row-1 w-[89.739px]"
                data-node-id="511:8914"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup10}
                />
              </div>
            </div>
            <div
              className="[word-break:break-word] font-['Poppins:Regular'] not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[669px]"
              data-node-id="513:11427"
            >
              <p className="font-['Poppins:SemiBold'] leading-[1.3] mb-0">
                Aksi Netral / Navigasi.
              </p>
              <p className="leading-[1.3]">
                Gunakan untuk membuka menu, Settings, Profile, Home, Store, atau Pause.
              </p>
            </div>
          </div>
          <div
            className="-translate-x-1/2 absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[259px] left-[calc(50%-0.5px)] top-[calc(25%+380.45px)] w-[1175px]"
            data-node-id="513:11438"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(25%+368.45px)]"
            data-node-id="513:11441"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(25%+627.45px)]"
            data-node-id="513:11443"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(25%+368.45px)]"
            data-node-id="513:11442"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(25%+627.45px)]"
            data-node-id="513:11444"
          />
        </div>
        <div
          className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(25%+711.45px)]"
          data-node-id="513:11452"
        >
          <div
            className="absolute content-stretch flex items-center justify-between leading-[0] left-[calc(14.29%-13.29px)] top-[calc(25%+754.45px)] w-[1102px]"
            data-node-id="513:11454"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="513:11338"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[113.77px] mt-0 place-items-start relative row-1"
                data-node-id="513:11256"
              >
                <div
                  className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                  data-node-id="513:11257"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector30}
                  />
                </div>
                <div
                  className="col-1 h-[72.703px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.482px]"
                  data-node-id="513:11258"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector31}
                  />
                </div>
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11259"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector32} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11260"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11261"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11262"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="513:11263"
              >
                <div
                  className="col-1 h-[72.711px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.566px]"
                  data-node-id="513:11264"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector33}
                  />
                </div>
                <div
                  className="col-1 h-[72.703px] ml-[6.65px] mt-[6.65px] relative row-1 w-[75.482px]"
                  data-node-id="513:11265"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector34}
                  />
                </div>
                <div
                  className="col-1 h-[86px] ml-0 mt-0 relative row-1 w-[88.772px]"
                  data-node-id="513:11266"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.51%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector32} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.65px] mt-[6.65px] place-items-start relative row-1"
                  data-node-id="513:11267"
                >
                  <div
                    className="col-1 h-[23.27px] ml-0 mt-0 relative row-1 w-[37.399px]"
                    data-node-id="513:11268"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.919px] ml-0 mt-0 relative row-1 w-[45.709px]"
                    data-node-id="513:11269"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 h-[86px] ml-[227.54px] mt-px relative row-1 w-[89.739px]"
                data-node-id="511:8754"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup11}
                />
              </div>
            </div>
            <div
              className="[word-break:break-word] font-['Poppins:SemiBold'] not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[672px]"
              data-node-id="513:11429"
            >
              <p className="leading-[1.3] mb-0">Aksi Negatif / Berhenti.</p>
              <p className="font-['Poppins:Regular'] leading-[1.3]">
                Gunakan untuk tombol Close, Cancel, No, Stop, atau Quit.
              </p>
            </div>
          </div>
          <div
            className="-translate-x-1/2 absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[150px] left-[calc(50%-0.5px)] top-[calc(25%+723.45px)] w-[1175px]"
            data-node-id="513:11445"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(25%+711.45px)]"
            data-node-id="513:11448"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(25%+861.45px)]"
            data-node-id="513:11449"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(25%+711.45px)]"
            data-node-id="513:11450"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(25%+861.45px)]"
            data-node-id="513:11451"
          />
        </div>
        <div
          className="absolute contents left-[calc(7.14%+42.86px)] top-[calc(30%+66.55px)]"
          data-node-id="513:11559"
        >
          <div
            className="absolute content-stretch flex gap-[163px] items-center left-[calc(14.29%+49.71px)] top-[calc(30%+109.55px)] w-[1023px]"
            data-node-id="513:11560"
          >
            <div
              className="content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] flex gap-[25px] items-center justify-center relative shrink-0"
              data-node-id="513:11558"
            >
              <div
                className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                data-node-id="513:11526"
              >
                <div
                  className="col-1 h-[72.313px] ml-[6.34px] mt-[6.34px] relative row-1 w-[74.851px]"
                  data-node-id="513:11527"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector5}
                  />
                </div>
                <div
                  className="col-1 h-[71.679px] ml-[6.34px] mt-[7.61px] relative row-1 w-[74.851px]"
                  data-node-id="513:11528"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector6}
                  />
                </div>
                <div
                  className="col-1 h-[85px] ml-0 mt-0 relative row-1 w-[87.537px]"
                  data-node-id="513:11529"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-1.06%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector7} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.57px] mt-[6.57px] place-items-start relative row-1"
                  data-node-id="513:11530"
                >
                  <div
                    className="col-1 h-[23px] ml-0 mt-0 relative row-1 w-[36.964px]"
                    data-node-id="513:11531"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[29.571px] ml-0 mt-0 relative row-1 w-[45.178px]"
                    data-node-id="513:11532"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="h-[85px] relative shrink-0 w-[88.696px]"
                data-node-id="513:11553"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup2}
                />
              </div>
            </div>
            <div
              className="[word-break:break-word] font-['Poppins:SemiBold'] leading-[0] not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[659px]"
              data-node-id="513:11581"
            >
              <p className="leading-[1.3] mb-0">Status Nonaktif.</p>
              <p className="font-['Poppins:Regular'] leading-[1.3]">
                Eksklusif hanya untuk tombol dengan state Disabled.
              </p>
            </div>
          </div>
          <div
            className="-translate-x-1/2 absolute border-2 border-[rgba(0,0,0,0.3)] border-dashed h-[150px] left-[calc(50%-0.5px)] top-[calc(30%+78.55px)] w-[1175px]"
            data-node-id="513:11582"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(30%+66.55px)]"
            data-node-id="513:11583"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(7.14%+42.86px)] size-[24px] top-[calc(30%+216.55px)]"
            data-node-id="513:11584"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(30%+66.55px)]"
            data-node-id="513:11585"
          />
          <div
            className="absolute bg-[rgba(16,122,253,0.3)] left-[calc(85.71%+39.29px)] size-[24px] top-[calc(30%+216.55px)]"
            data-node-id="513:11586"
          />
        </div>
      </div>
      <div
        className="[word-break:break-word] absolute contents left-[calc(14.29%-13.29px)] top-[calc(30%+390.55px)]"
        data-node-id="523:165"
      >
        <p
          className="absolute font-['Poppins:Medium'] h-[78px] leading-[1.3] left-[calc(50%-549px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(30%+481.55px)] w-[1096px]"
          data-node-id="518:112"
        >
          Tidak ada ketentuan font khusus terkait penggunaan font, namun penulis menyarankan untuk
          menggunakan font “Anja Eliane”. Font ini dipilih karena bentuknya yang rounded dan tebal,
          sangat mudah dibaca oleh anak-anak dan selaras dengan estetika game edukasi.
        </p>
        <p
          className="absolute font-['Poppins:Medium_Italic'] h-[30px] italic leading-[1.3] left-[calc(64.29%-308.29px)] text-[#565656] text-[20px] text-justify top-[calc(30%+738.6px)] w-[641px]"
          data-node-id="523:164"
        >
          *Font ini bisa untuk Headline, bisa juga untuk body
        </p>
        <p
          className="absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-94px)] not-italic text-[#565656] text-[26px] top-[calc(30%+390.55px)] whitespace-nowrap"
          data-node-id="518:113"
        >
          Panduan Font
        </p>
        <div
          className="absolute font-['Poppins:Medium'] h-[114px] leading-[0] left-[calc(25%-174px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(35%+59.7px)] w-[350px]"
          data-node-id="519:242"
        >
          <p className="font-['Poppins:Bold'] leading-[1.4] mb-0">AaBbCc01234</p>
          <p className="font-['Poppins:Bold'] leading-[1.4] mb-0">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="font-['Poppins:Bold'] leading-[1.4] lowercase mb-0">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p className="font-['Poppins:Bold'] leading-[1.4] lowercase">1234567890</p>
        </div>
        <div
          className="absolute font-['Poppins:Bold'] h-[224px] leading-[0] left-[calc(64.29%-308.29px)] not-italic text-[#565656] text-[20px] top-[calc(30%+828.6px)] w-[641px]"
          data-node-id="523:162"
        >
          <p className="leading-[1.4] mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="leading-[1.4]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <p
          className="absolute font-['Poppins:Bold'] h-[30px] leading-[1.2] left-[calc(25%-174px)] not-italic text-[#565656] text-[36px] text-justify top-[calc(30%+619.55px)] w-[374px]"
          data-node-id="523:163"
        >
          Anja Eliane Typeface
        </p>
        <div
          className="absolute contents leading-[1.2] left-[calc(14.29%-13.29px)] not-italic text-justify top-[calc(30%+709.55px)]"
          data-node-id="523:161"
        >
          <p
            className="absolute font-['Poppins:SemiBold'] h-[30px] left-[calc(17.86%-66.86px)] text-[#565656] text-[24px] top-[calc(30%+848.6px)] w-[92px]"
            data-node-id="519:240"
          >
            Normal
          </p>
          <p
            className="absolute font-['Poppins:Bold'] left-[calc(14.29%-13.29px)] text-[#107afd] text-[128px] top-[calc(30%+709.55px)] whitespace-nowrap"
            data-node-id="519:237"
          >
            Aa
          </p>
        </div>
      </div>
      <div
        className="[word-break:break-word] absolute contents left-[calc(14.29%-13.29px)] top-[calc(90%+401.53px)]"
        data-node-id="526:157"
      >
        <p
          className="absolute font-['Poppins:Medium'] h-[78px] leading-[1.3] left-[calc(50%-549px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(90%+492.53px)] w-[1096px]"
          data-node-id="526:158"
        >
          Tidak ada ketentuan font khusus terkait penggunaan font, namun penulis menyarankan untuk
          menggunakan font “Anja Eliane”. Font ini dipilih karena bentuknya yang rounded dan tebal,
          sangat mudah dibaca oleh anak-anak dan selaras dengan estetika game edukasi.
        </p>
        <p
          className="absolute font-['Poppins:Medium_Italic'] h-[30px] italic leading-[1.3] left-[calc(64.29%-308.29px)] text-[#565656] text-[20px] text-justify top-[calc(90%+749.57px)] w-[641px]"
          data-node-id="526:159"
        >
          *Font ini bisa untuk Headline, bisa juga untuk body
        </p>
        <p
          className="absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-94px)] not-italic text-[#565656] text-[26px] top-[calc(90%+401.53px)] whitespace-nowrap"
          data-node-id="526:160"
        >
          Panduan Font
        </p>
        <div
          className="absolute font-['Poppins:Medium'] h-[114px] leading-[0] left-[calc(25%-174px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(95%+70.67px)] w-[350px]"
          data-node-id="526:161"
        >
          <p className="font-['Poppins:Bold'] leading-[1.4] mb-0">AaBbCc01234</p>
          <p className="font-['Poppins:Bold'] leading-[1.4] mb-0">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="font-['Poppins:Bold'] leading-[1.4] lowercase mb-0">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p className="font-['Poppins:Bold'] leading-[1.4] lowercase">1234567890</p>
        </div>
        <div
          className="absolute font-['Poppins:Bold'] h-[224px] leading-[0] left-[calc(64.29%-308.29px)] not-italic text-[#565656] text-[20px] top-[calc(90%+839.57px)] w-[641px]"
          data-node-id="526:162"
        >
          <p className="leading-[1.4] mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="leading-[1.4]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <p
          className="absolute font-['Poppins:Bold'] h-[30px] leading-[1.2] left-[calc(25%-174px)] not-italic text-[#565656] text-[36px] text-justify top-[calc(90%+630.53px)] w-[374px]"
          data-node-id="526:163"
        >
          Anja Eliane Typeface
        </p>
        <div
          className="absolute contents leading-[1.2] left-[calc(14.29%-13.29px)] not-italic text-justify top-[calc(90%+720.53px)]"
          data-node-id="526:164"
        >
          <p
            className="absolute font-['Poppins:SemiBold'] h-[30px] left-[calc(17.86%-66.86px)] text-[#565656] text-[24px] top-[calc(90%+859.57px)] w-[92px]"
            data-node-id="526:165"
          >
            Normal
          </p>
          <p
            className="absolute font-['Poppins:Bold'] left-[calc(14.29%-13.29px)] text-[#107afd] text-[128px] top-[calc(90%+720.53px)] whitespace-nowrap"
            data-node-id="526:166"
          >
            Aa
          </p>
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute contents left-[calc(50%-1px)] top-[calc(40%+276.8px)]"
        data-node-id="520:2"
      >
        <p
          className="[word-break:break-word] absolute font-['Poppins:Medium'] h-[54px] leading-[1.2] left-[calc(50%-549px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(40%+367.8px)] w-[1096px]"
          data-node-id="514:11587"
        >
          Agar tampilan tetap rapi, konsisten, dan mudah dipahami pengguna, perhatikan beberapa hal
          yang sebaiknya dilakukan berikut ini:
        </p>
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-137px)] not-italic text-[#565656] text-[26px] top-[calc(40%+276.8px)] whitespace-nowrap"
          data-node-id="514:11588"
        >
          Aturan Penggunaan
        </p>
        <div
          className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(45%+105.75px)]"
          data-node-id="514:12051"
        >
          <ul
            className="[word-break:break-word] absolute block font-['Poppins:Medium'] h-[54px] leading-[0] left-[calc(53.57%-554.57px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(45%+172.75px)] w-[1053px]"
            data-node-id="514:11731"
          >
            <li className="list-disc ms-[30px]">
              <span className="leading-[1.2]">
                Gunakan warna sesuai dengan panduan semantik warna untuk mempercepat pemahaman
                pengguna.
              </span>
            </li>
          </ul>
          <div
            className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(45%+105.75px)]"
            data-node-id="514:12022"
          >
            <div
              className="absolute left-[calc(7.14%+88.86px)] size-[37px] top-[calc(45%+105.75px)]"
              data-node-id="514:11732"
            >
              <div className="absolute inset-[9.31%_10.19%_12.79%_10.19%]">
                <img alt="" className="block max-w-none size-full" src={imgStar2} />
              </div>
            </div>
            <p
              className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[0] left-[calc(14.29%+34.71px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(45%+112.75px)] whitespace-nowrap"
              data-node-id="514:11733"
            >
              <span className="font-['Poppins:Bold'] leading-[1.2]">Do</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">{` `}</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">/ Lakukan</span>
            </p>
          </div>
          <div
            className="absolute contents left-[calc(14.29%+34.71px)] top-[calc(45%+256.75px)]"
            data-node-id="514:12025"
          >
            <div
              className="absolute h-[231px] left-[calc(14.29%+34.71px)] top-[calc(45%+256.75px)] w-[514px]"
              data-node-id="514:11734"
              data-name="Artboard 1 copy 4 3"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgArtboard1Copy43}
              />
            </div>
            <div
              className="absolute contents inset-[47.89%_64.87%_51.88%_32.4%]"
              data-node-id="514:11745"
            >
              <div
                className="absolute contents inset-[47.89%_64.87%_51.88%_32.4%]"
                data-node-id="514:11746"
                data-name="Clip path group"
              >
                <div
                  className="absolute inset-[47.89%_64.87%_51.88%_32.4%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.051px_0.014px] mask-size-[40.922px_40.852px]"
                  data-node-id="514:11749"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup13}
                  />
                </div>
              </div>
              <div
                className="absolute inset-[47.95%_65.3%_51.94%_32.83%]"
                data-node-id="514:11751"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector35}
                />
              </div>
            </div>
            <div
              className="absolute contents inset-[47.89%_28.94%_51.88%_68.33%]"
              data-node-id="514:11752"
            >
              <div
                className="absolute contents inset-[47.89%_28.94%_51.88%_68.33%]"
                data-node-id="514:11753"
                data-name="Clip path group"
              >
                <div
                  className="absolute inset-[47.89%_28.94%_51.88%_68.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.014px] mask-size-[40.922px_40.852px]"
                  data-node-id="514:11756"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup14}
                  />
                </div>
              </div>
              <div
                className="absolute inset-[47.94%_29.55%_51.93%_68.95%]"
                data-node-id="514:11758"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector36}
                />
              </div>
              <div
                className="absolute inset-[47.94%_29.55%_51.93%_68.95%]"
                data-node-id="514:11759"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector37}
                />
              </div>
            </div>
            <div
              className="absolute contents left-[calc(50%+38px)] top-[calc(45%+256.75px)]"
              data-node-id="514:12023"
            >
              <div
                className="absolute h-[231px] left-[calc(50%+38px)] top-[calc(45%+256.75px)] w-[514px]"
                data-node-id="514:11735"
                data-name="Artboard 1 copy 4 4"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgArtboard1Copy43}
                />
              </div>
              <div
                className="absolute inset-[47.26%_28.33%_52.42%_67.73%]"
                data-node-id="514:11764"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup277}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(45%+608.6px)]"
          data-node-id="514:12050"
        >
          <div
            className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(45%+608.6px)]"
            data-node-id="514:12018"
          >
            <div
              className="absolute left-[calc(7.14%+88.86px)] size-[37px] top-[calc(45%+608.6px)]"
              data-node-id="514:11768"
            >
              <div className="absolute inset-[9.31%_10.19%_12.79%_10.19%]">
                <img alt="" className="block max-w-none size-full" src={imgStar2} />
              </div>
            </div>
            <p
              className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[0] left-[calc(14.29%+34.71px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(45%+615.6px)] whitespace-nowrap"
              data-node-id="514:11769"
            >
              <span className="font-['Poppins:Bold'] leading-[1.2]">Do</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">{` `}</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">/ Lakukan</span>
            </p>
          </div>
          <div
            className="absolute content-stretch flex flex-col gap-[30px] items-center leading-[0] left-[calc(14.29%+34.71px)] top-[calc(45%+675.6px)] w-[1053px]"
            data-node-id="514:12048"
          >
            <ul
              className="[word-break:break-word] block font-['Poppins:Medium'] h-[54px] min-w-full not-italic relative shrink-0 text-[#565656] text-[20px] text-justify w-[min-content]"
              data-node-id="514:11767"
            >
              <li className="list-disc ms-[30px]">
                <span className="leading-[1.2]">
                  Pertahankan area kosong (safe area / padding) antara ikon dan batas tombol agar
                  tombol tetap proporsional.
                </span>
              </li>
            </ul>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="514:11999"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[226.39px] mt-[54.41px] place-items-start relative row-1"
                data-node-id="514:11846"
              >
                <div
                  className="col-1 h-[117.563px] ml-[10.75px] mt-[10.75px] relative row-1 w-[122.179px]"
                  data-node-id="514:11847"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector38}
                  />
                </div>
                <div
                  className="col-1 h-[117.55px] ml-[10.75px] mt-[10.75px] relative row-1 w-[122.044px]"
                  data-node-id="514:11848"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector39}
                  />
                </div>
                <div
                  className="col-1 h-[139.049px] ml-0 mt-0 relative row-1 w-[143.532px]"
                  data-node-id="514:11849"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-2.12%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector40} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[10.75px] mt-[10.75px] place-items-start relative row-1"
                  data-node-id="514:11850"
                >
                  <div
                    className="col-1 h-[37.625px] ml-0 mt-0 relative row-1 w-[60.468px]"
                    data-node-id="514:11851"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[48.374px] ml-0 mt-0 relative row-1 w-[73.905px]"
                    data-node-id="514:11852"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 h-[139.05px] ml-[51.39px] mt-[54.41px] relative row-1 w-[145.095px]"
                data-node-id="511:8249"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup15}
                />
              </div>
              <div
                className="col-1 h-[247.871px] ml-[196.48px] mt-0 relative row-1 w-0"
                data-node-id="514:11803"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[225.7px] mt-0 relative row-1 w-0"
                data-node-id="514:11805"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[22.17px] mt-0 relative row-1 w-0"
                data-node-id="514:11806"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[51.39px] mt-0 relative row-1 w-0"
                data-node-id="514:11807"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-0 mt-[54.3px] relative row-1 w-[370px]"
                data-node-id="514:11808"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-0 mt-[25.3px] relative row-1 w-[370px]"
                data-node-id="514:11810"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-0 mt-[223.07px] relative row-1 w-[370px]"
                data-node-id="514:11812"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-0 mt-[193.07px] relative row-1 w-[370px]"
                data-node-id="514:11813"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#e2e2e2] col-1 ml-[22.17px] mt-[193.46px] relative row-1 size-[29.019px]"
                data-node-id="514:11811"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[197.49px] mt-[193.46px] relative row-1 size-[29.019px]"
                data-node-id="514:11819"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[22.17px] mt-[25.19px] relative row-1 size-[29.019px]"
                data-node-id="514:11818"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[197.49px] mt-[25.19px] relative row-1 size-[29.019px]"
                data-node-id="514:11820"
              />
              <p
                className="[word-break:break-word] col-1 font-['Poppins:Medium'] leading-[1.2] ml-[88.67px] mt-[30.23px] not-italic relative row-1 text-[#565656] text-[14.106px] text-justify whitespace-nowrap"
                data-node-id="514:11821"
              >
                Safe zone
              </p>
              <div
                className="col-1 flex items-center justify-center ml-[89.19px] mt-[199.63px] relative row-1"
                data-node-id="514:11822"
              >
                <div className="flex-none rotate-180">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 flex h-[69px] items-center justify-center ml-[27.21px] mt-[89.19px] relative row-1 w-[17px]"
                data-node-id="514:11823"
              >
                <div className="-rotate-90 flex-none">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 flex h-[69px] items-center justify-center ml-[202.66px] mt-[88.67px] relative row-1 w-[17px]"
                data-node-id="514:11824"
              >
                <div className="flex-none rotate-90">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[370.48px] mt-0 relative row-1 w-0"
                data-node-id="514:11830"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[399.7px] mt-0 relative row-1 w-0"
                data-node-id="514:11831"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="bg-[#e2e2e2] col-1 ml-[370.48px] mt-[193.46px] relative row-1 size-[29.019px]"
                data-node-id="514:11839"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[370.48px] mt-[25.19px] relative row-1 size-[29.019px]"
                data-node-id="514:11841"
              />
              <p
                className="[word-break:break-word] col-1 font-['Poppins:Medium'] leading-[1.2] ml-[263.67px] mt-[30.23px] not-italic relative row-1 text-[#565656] text-[14.106px] text-justify whitespace-nowrap"
                data-node-id="514:11842"
              >
                Safe zone
              </p>
              <div
                className="col-1 flex items-center justify-center ml-[264.19px] mt-[199.63px] relative row-1"
                data-node-id="514:11843"
              >
                <div className="flex-none rotate-180">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 flex h-[69px] items-center justify-center ml-[376.65px] mt-[88.67px] relative row-1 w-[17px]"
                data-node-id="514:11845"
              >
                <div className="flex-none rotate-90">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[749.48px] mt-0 relative row-1 w-0"
                data-node-id="514:11866"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[778.7px] mt-0 relative row-1 w-0"
                data-node-id="514:11867"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[575.17px] mt-0 relative row-1 w-0"
                data-node-id="514:11868"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[604.39px] mt-0 relative row-1 w-0"
                data-node-id="514:11869"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-[553px] mt-[54.3px] relative row-1 w-[370px]"
                data-node-id="514:11870"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-[553px] mt-[25.3px] relative row-1 w-[370px]"
                data-node-id="514:11871"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-[553px] mt-[223.07px] relative row-1 w-[370px]"
                data-node-id="514:11872"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 flex h-0 items-center justify-center ml-[553px] mt-[193.07px] relative row-1 w-[370px]"
                data-node-id="514:11873"
              >
                <div className="-rotate-90 flex-none">
                  <div className="h-[370px] relative w-0">
                    <div className="absolute inset-[0_-1.01px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector42} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-[#e2e2e2] col-1 ml-[575.17px] mt-[193.46px] relative row-1 size-[29.019px]"
                data-node-id="514:11874"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[750.49px] mt-[193.46px] relative row-1 size-[29.019px]"
                data-node-id="514:11875"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[575.17px] mt-[25.19px] relative row-1 size-[29.019px]"
                data-node-id="514:11876"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[750.49px] mt-[25.19px] relative row-1 size-[29.019px]"
                data-node-id="514:11877"
              />
              <p
                className="[word-break:break-word] col-1 font-['Poppins:Medium'] leading-[1.2] ml-[641.67px] mt-[30.23px] not-italic relative row-1 text-[#565656] text-[14.106px] text-justify whitespace-nowrap"
                data-node-id="514:11878"
              >
                Safe zone
              </p>
              <div
                className="col-1 flex items-center justify-center ml-[642.19px] mt-[199.63px] relative row-1"
                data-node-id="514:11879"
              >
                <div className="flex-none rotate-180">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 flex h-[69px] items-center justify-center ml-[580.21px] mt-[89.19px] relative row-1 w-[17px]"
                data-node-id="514:11880"
              >
                <div className="-rotate-90 flex-none">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[923.48px] mt-0 relative row-1 w-0"
                data-node-id="514:11882"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="col-1 h-[247.871px] ml-[952.7px] mt-0 relative row-1 w-0"
                data-node-id="514:11883"
              >
                <div className="absolute inset-[0_-1.01px]">
                  <img alt="" className="block max-w-none size-full" src={imgVector41} />
                </div>
              </div>
              <div
                className="bg-[#e2e2e2] col-1 ml-[923.48px] mt-[193.46px] relative row-1 size-[29.019px]"
                data-node-id="514:11884"
              />
              <div
                className="bg-[#e2e2e2] col-1 ml-[923.48px] mt-[25.19px] relative row-1 size-[29.019px]"
                data-node-id="514:11885"
              />
              <p
                className="[word-break:break-word] col-1 font-['Poppins:Medium'] leading-[1.2] ml-[816.67px] mt-[30.23px] not-italic relative row-1 text-[#565656] text-[14.106px] text-justify whitespace-nowrap"
                data-node-id="514:11886"
              >
                Safe zone
              </p>
              <div
                className="col-1 flex items-center justify-center ml-[817.19px] mt-[199.63px] relative row-1"
                data-node-id="514:11887"
              >
                <div className="flex-none rotate-180">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 flex h-[69px] items-center justify-center ml-[929.65px] mt-[88.67px] relative row-1 w-[17px]"
                data-node-id="514:11888"
              >
                <div className="flex-none rotate-90">
                  <p className="[word-break:break-word] font-['Poppins:Medium'] leading-[1.2] not-italic relative text-[#565656] text-[14.106px] text-justify whitespace-nowrap">
                    Safe zone
                  </p>
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[755px] mt-[54.41px] place-items-start relative row-1"
                data-node-id="514:11854"
              >
                <div
                  className="col-1 h-[117.563px] ml-[10.75px] mt-[10.75px] relative row-1 w-[122.179px]"
                  data-node-id="514:11855"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector38}
                  />
                </div>
                <div
                  className="col-1 h-[117.55px] ml-[10.75px] mt-[10.75px] relative row-1 w-[122.044px]"
                  data-node-id="514:11856"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector39}
                  />
                </div>
                <div
                  className="col-1 h-[139.049px] ml-0 mt-0 relative row-1 w-[143.532px]"
                  data-node-id="514:11857"
                  data-name="Vector"
                >
                  <div className="absolute inset-[0_0_-2.12%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector40} />
                  </div>
                </div>
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[10.75px] mt-[10.75px] place-items-start relative row-1"
                  data-node-id="514:11858"
                >
                  <div
                    className="col-1 h-[37.625px] ml-0 mt-0 relative row-1 w-[60.468px]"
                    data-node-id="514:11859"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                        src={imgRectangle}
                      />
                    </div>
                  </div>
                  <div
                    className="col-1 h-[48.374px] ml-0 mt-0 relative row-1 w-[73.905px]"
                    data-node-id="514:11860"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                        src={imgRectangle1}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-1 h-[139.05px] ml-[604.39px] mt-[54.41px] relative row-1 w-[145.095px]"
                data-node-id="514:11861"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup16}
                />
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="514:12047"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[539px] mt-0 place-items-start relative row-1"
                data-node-id="514:11889"
              >
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                  data-node-id="514:11890"
                  data-name="Clip path group"
                >
                  <div
                    className="col-1 h-[40.834px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.014px] mask-size-[40.922px_40.852px] ml-0 mt-[-0.01px] relative row-1 w-[40.871px]"
                    data-node-id="514:11893"
                    style={{ maskImage: `url("${imgGroup12}")` }}
                    data-name="Group"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgGroup14}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[22.476px] ml-[9.19px] mt-[9.17px] relative row-1 w-[22.495px]"
                  data-node-id="514:11895"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector36}
                  />
                </div>
                <div
                  className="col-1 h-[22.476px] ml-[9.19px] mt-[9.17px] relative row-1 w-[22.495px]"
                  data-node-id="514:11896"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector37}
                  />
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="514:11781"
              >
                <div
                  className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                  data-node-id="514:11782"
                  data-name="Clip path group"
                >
                  <div
                    className="col-1 h-[40.834px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.051px_0.014px] mask-size-[40.922px_40.852px] ml-[0.05px] mt-[-0.01px] relative row-1 w-[40.871px]"
                    data-node-id="514:11785"
                    style={{ maskImage: `url("${imgGroup12}")` }}
                    data-name="Group"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgGroup13}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[19.937px] ml-[6.5px] mt-[10.43px] relative row-1 w-[27.982px]"
                  data-node-id="514:11787"
                  data-name="Vector"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgVector35}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(50%+259.43px)]"
          data-node-id="514:12017"
        >
          <ul
            className="[word-break:break-word] absolute block font-['Poppins:Medium'] h-[30px] leading-[0] left-[calc(53.57%-554.57px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(50%+301.43px)] w-[1053px]"
            data-node-id="514:11901"
          >
            <li className="leading-[1.2] list-disc ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:Bold'] not-italic">
                JANGAN
              </span>
              {` Mengubah warna Button selain dari warna yang sudah disediakan.`}
            </li>
          </ul>
          <div
            className="absolute left-[calc(7.14%+88.86px)] size-[37px] top-[calc(50%+259.43px)]"
            data-node-id="514:11910"
          >
            <div className="absolute inset-[9.31%_10.19%_12.79%_10.19%]">
              <img alt="" className="block max-w-none size-full" src={imgStar3} />
            </div>
          </div>
          <p
            className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[0] left-[calc(14.29%+34.71px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(50%+266.43px)] whitespace-nowrap"
            data-node-id="514:11911"
          >
            <span className="font-['Poppins:Bold'] leading-[1.2]">Don’t</span>
            <span className="font-['Poppins:Bold'] leading-[1.2]">{` `}</span>
            <span className="font-['Poppins:Bold'] leading-[1.2]">/ Jangan Lakukan</span>
          </p>
        </div>
        <div
          className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(50%+391.43px)]"
          data-node-id="514:12046"
        >
          <div
            className="absolute content-stretch flex items-center justify-between leading-[0] left-[calc(28.57%+57.43px)] top-[calc(50%+731.3px)] w-[579.922px]"
            data-node-id="514:12045"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="514:12037"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="514:12038"
                data-name="Clip path group"
              >
                <div
                  className="col-1 h-[40.834px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.051px_0.014px] mask-size-[40.922px_40.852px] ml-[0.05px] mt-[-0.01px] relative row-1 w-[40.871px]"
                  data-node-id="514:12041"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup13}
                  />
                </div>
              </div>
              <div
                className="col-1 h-[19.937px] ml-[6.5px] mt-[10.43px] relative row-1 w-[27.982px]"
                data-node-id="514:12043"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector35}
                />
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="514:12029"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="514:12030"
                data-name="Clip path group"
              >
                <div
                  className="col-1 h-[40.834px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.014px] mask-size-[40.922px_40.852px] ml-0 mt-[-0.01px] relative row-1 w-[40.871px]"
                  data-node-id="514:12033"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup14}
                  />
                </div>
              </div>
              <div
                className="col-1 h-[22.476px] ml-[9.19px] mt-[9.17px] relative row-1 w-[22.495px]"
                data-node-id="514:12035"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector36}
                />
              </div>
              <div
                className="col-1 h-[22.476px] ml-[9.19px] mt-[9.17px] relative row-1 w-[22.495px]"
                data-node-id="514:12036"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector37}
                />
              </div>
            </div>
          </div>
          <ul
            className="[word-break:break-word] absolute block font-['Poppins:Medium'] h-[54px] leading-[0] left-[calc(53.57%-554.57px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(50%+458.43px)] w-[1053px]"
            data-node-id="514:11988"
          >
            <li className="leading-[1.2] list-disc ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:Bold'] not-italic">
                JANGAN
              </span>
              {` Menggunakan Bubble Button berukuran sangat kecil, karena efek 3D nya akan terlihat menumpuk dan mengurangi kejelasan ikon.`}
            </li>
          </ul>
          <div
            className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(50%+391.43px)]"
            data-node-id="514:12021"
          >
            <div
              className="absolute left-[calc(7.14%+88.86px)] size-[37px] top-[calc(50%+391.43px)]"
              data-node-id="514:11989"
            >
              <div className="absolute inset-[9.31%_10.19%_12.79%_10.19%]">
                <img alt="" className="block max-w-none size-full" src={imgStar3} />
              </div>
            </div>
            <p
              className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[0] left-[calc(14.29%+34.71px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(50%+398.43px)] whitespace-nowrap"
              data-node-id="514:11990"
            >
              <span className="font-['Poppins:Bold'] leading-[1.2]">Don’t</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">{` `}</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">/ Jangan Lakukan</span>
            </p>
          </div>
          <div
            className="absolute content-stretch flex items-center justify-between leading-[0] left-[calc(28.57%-4.57px)] top-[calc(50%+542.43px)] w-[647.77px]"
            data-node-id="514:12044"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="514:11616"
            >
              <div
                className="col-1 h-[134.328px] ml-[12.28px] mt-[12.28px] relative row-1 w-[139.602px]"
                data-node-id="514:11617"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector43}
                />
              </div>
              <div
                className="col-1 h-[134.313px] ml-[12.28px] mt-[12.28px] relative row-1 w-[139.448px]"
                data-node-id="514:11618"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector44}
                />
              </div>
              <div
                className="col-1 h-[158.878px] ml-0 mt-0 relative row-1 w-[164px]"
                data-node-id="514:11619"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-0.82%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector45} />
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[12.28px] mt-[12.28px] place-items-start relative row-1"
                data-node-id="514:11620"
              >
                <div
                  className="col-1 h-[42.99px] ml-0 mt-0 relative row-1 w-[69.091px]"
                  data-node-id="514:11621"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                      src={imgRectangle}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[55.273px] ml-0 mt-0 relative row-1 w-[84.444px]"
                  data-node-id="514:11622"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                      src={imgRectangle1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="514:11991"
            >
              <div
                className="col-1 h-[43.222px] ml-[3.95px] mt-[3.95px] relative row-1 w-[44.919px]"
                data-node-id="514:11992"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector46}
                />
              </div>
              <div
                className="col-1 h-[43.217px] ml-[3.95px] mt-[3.95px] relative row-1 w-[44.87px]"
                data-node-id="514:11993"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector47}
                />
              </div>
              <div
                className="col-1 h-[51.122px] ml-0 mt-0 relative row-1 w-[52.77px]"
                data-node-id="514:11994"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-2.53%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector48} />
                </div>
              </div>
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[3.95px] mt-[3.95px] place-items-start relative row-1"
                data-node-id="514:11995"
              >
                <div
                  className="col-1 h-[13.833px] ml-0 mt-0 relative row-1 w-[22.231px]"
                  data-node-id="514:11996"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                      src={imgRectangle}
                    />
                  </div>
                </div>
                <div
                  className="col-1 h-[17.785px] ml-0 mt-0 relative row-1 w-[27.171px]"
                  data-node-id="514:11997"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                      src={imgRectangle1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(50%+832.16px)]"
          data-node-id="518:69"
        >
          <div
            className="absolute content-stretch flex items-center justify-between leading-[0] left-[calc(28.57%+57.43px)] top-[calc(55%+293.13px)] w-[579.922px]"
            data-node-id="518:27"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="518:28"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="518:29"
                data-name="Clip path group"
              >
                <div
                  className="col-1 h-[40.834px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.051px_0.014px] mask-size-[40.922px_40.852px] ml-[0.05px] mt-[-0.01px] relative row-1 w-[40.871px]"
                  data-node-id="518:32"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup13}
                  />
                </div>
              </div>
              <div
                className="col-1 h-[19.937px] ml-[6.5px] mt-[10.43px] relative row-1 w-[27.982px]"
                data-node-id="518:34"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector35}
                />
              </div>
            </div>
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-node-id="518:35"
            >
              <div
                className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
                data-node-id="518:36"
                data-name="Clip path group"
              >
                <div
                  className="col-1 h-[40.834px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.014px] mask-size-[40.922px_40.852px] ml-0 mt-[-0.01px] relative row-1 w-[40.871px]"
                  data-node-id="518:39"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup14}
                  />
                </div>
              </div>
              <div
                className="col-1 h-[22.476px] ml-[9.19px] mt-[9.17px] relative row-1 w-[22.495px]"
                data-node-id="518:41"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector36}
                />
              </div>
              <div
                className="col-1 h-[22.476px] ml-[9.19px] mt-[9.17px] relative row-1 w-[22.495px]"
                data-node-id="518:42"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector37}
                />
              </div>
            </div>
          </div>
          <ul
            className="[word-break:break-word] absolute block font-['Poppins:Medium'] h-[54px] leading-[0] left-[calc(53.57%-554.57px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(55%+20.26px)] w-[1053px]"
            data-node-id="518:43"
          >
            <li className="leading-[1.2] list-disc ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:Bold'] not-italic">{`JANGAN `}</span>
              Mengubah proporsi tombol secara manual yang dapat merusak kelengkungan sudut (rounded
              corners).
            </li>
          </ul>
          <div
            className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(50%+832.16px)]"
            data-node-id="518:44"
          >
            <div
              className="absolute left-[calc(7.14%+88.86px)] size-[37px] top-[calc(50%+832.16px)]"
              data-node-id="518:45"
            >
              <div className="absolute inset-[9.31%_10.19%_12.79%_10.19%]">
                <img alt="" className="block max-w-none size-full" src={imgStar3} />
              </div>
            </div>
            <p
              className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[0] left-[calc(14.29%+34.71px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(50%+839.16px)] whitespace-nowrap"
              data-node-id="518:46"
            >
              <span className="font-['Poppins:Bold'] leading-[1.2]">Don’t</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">{` `}</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">/ Jangan Lakukan</span>
            </p>
          </div>
          <div
            className="absolute contents inset-[55.59%_60.8%_43.5%_28.27%]"
            data-node-id="518:48"
          >
            <div
              className="absolute inset-[55.66%_61.61%_43.57%_29.09%]"
              data-node-id="518:49"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector43}
              />
            </div>
            <div
              className="absolute inset-[55.66%_61.62%_43.57%_29.09%]"
              data-node-id="518:50"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector44}
              />
            </div>
            <div
              className="absolute inset-[55.59%_60.8%_43.5%_28.27%]"
              data-node-id="518:51"
              data-name="Vector"
            >
              <div className="absolute inset-[0_0_-0.82%_0]">
                <img alt="" className="block max-w-none size-full" src={imgVector45} />
              </div>
            </div>
            <div
              className="absolute contents inset-[55.66%_65.28%_44.02%_29.09%]"
              data-node-id="518:52"
            >
              <div
                className="absolute inset-[55.66%_66.31%_44.09%_29.09%]"
                data-node-id="518:53"
                data-name="Rectangle"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                    src={imgRectangle}
                  />
                </div>
              </div>
              <div
                className="absolute inset-[55.66%_65.28%_44.02%_29.09%]"
                data-node-id="518:54"
                data-name="Rectangle"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                    src={imgRectangle1}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute contents inset-[55.59%_26.93%_43.5%_66.2%]"
            data-node-id="518:62"
          >
            <div
              className="absolute inset-[55.66%_27.44%_43.57%_66.71%]"
              data-node-id="518:63"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector49}
              />
            </div>
            <div
              className="absolute inset-[55.66%_27.45%_43.57%_66.71%]"
              data-node-id="518:64"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector50}
              />
            </div>
            <div
              className="absolute inset-[55.59%_26.93%_43.5%_66.2%]"
              data-node-id="518:65"
              data-name="Vector"
            >
              <div className="absolute inset-[0_0_-0.82%_0]">
                <img alt="" className="block max-w-none size-full" src={imgVector51} />
              </div>
            </div>
            <div
              className="absolute contents inset-[55.66%_29.75%_44.02%_66.71%]"
              data-node-id="518:66"
            >
              <div
                className="absolute inset-[55.66%_30.39%_44.09%_66.71%]"
                data-node-id="518:67"
                data-name="Rectangle"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                    src={imgRectangle}
                  />
                </div>
              </div>
              <div
                className="absolute inset-[55.66%_29.75%_44.02%_66.71%]"
                data-node-id="518:68"
                data-name="Rectangle"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                    src={imgRectangle1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(40%+481.8px)]"
          data-node-id="518:110"
        >
          <ul
            className="[word-break:break-word] absolute block font-['Poppins:Medium'] h-[54px] leading-[0] left-[calc(53.57%-554.57px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(40%+548.8px)] w-[1053px]"
            data-node-id="514:11590"
          >
            <li className="list-disc ms-[30px]">
              <span className="leading-[1.2]">
                Konsisten menggunakan satu style (Bubble atau Flat) dalam satu tampilan layar
                (screen) yang sama agar visual tidak bentrok.
              </span>
            </li>
          </ul>
          <div
            className="absolute contents left-[calc(7.14%+88.86px)] top-[calc(40%+481.8px)]"
            data-node-id="514:12024"
          >
            <div
              className="absolute left-[calc(7.14%+88.86px)] size-[37px] top-[calc(40%+481.8px)]"
              data-node-id="514:11589"
            >
              <div className="absolute inset-[9.31%_10.19%_12.79%_10.19%]">
                <img alt="" className="block max-w-none size-full" src={imgStar2} />
              </div>
            </div>
            <p
              className="[word-break:break-word] absolute font-['Poppins:Medium'] leading-[0] left-[calc(14.29%+34.71px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(40%+488.8px)] whitespace-nowrap"
              data-node-id="514:11591"
            >
              <span className="font-['Poppins:Bold'] leading-[1.2]">Do</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">{` `}</span>
              <span className="font-['Poppins:Bold'] leading-[1.2]">/ Lakukan</span>
            </p>
          </div>
          <div
            className="absolute h-[231px] left-[calc(14.29%+34.71px)] top-[calc(40%+632.8px)] w-[514px]"
            data-node-id="514:11598"
            data-name="Artboard 1 copy 4 1"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy43}
            />
          </div>
          <div
            className="absolute h-[231px] left-[calc(50%+38px)] top-[calc(40%+632.8px)] w-[514px]"
            data-node-id="514:11599"
            data-name="Artboard 1 copy 4 2"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy43}
            />
          </div>
          <div
            className="absolute contents inset-[45.03%_28.94%_54.74%_32.4%]"
            data-node-id="514:12026"
          >
            <div
              className="absolute contents inset-[45.03%_64.87%_54.74%_32.4%]"
              data-node-id="514:11701"
            >
              <div
                className="absolute contents inset-[45.03%_64.87%_54.74%_32.4%]"
                data-node-id="514:11682"
                data-name="Clip path group"
              >
                <div
                  className="absolute inset-[45.03%_64.87%_54.74%_32.4%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.051px_0.014px] mask-size-[40.922px_40.852px]"
                  data-node-id="514:11678"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup13}
                  />
                </div>
              </div>
              <div
                className="absolute inset-[45.09%_65.3%_54.8%_32.83%]"
                data-node-id="514:11683"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector35}
                />
              </div>
            </div>
            <div
              className="absolute contents inset-[45.03%_28.94%_54.74%_68.33%]"
              data-node-id="514:11702"
            >
              <div
                className="absolute contents inset-[45.03%_28.94%_54.74%_68.33%]"
                data-node-id="514:11688"
                data-name="Clip path group"
              >
                <div
                  className="absolute inset-[45.03%_28.94%_54.74%_68.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.014px] mask-size-[40.922px_40.852px]"
                  data-node-id="514:11684"
                  style={{ maskImage: `url("${imgGroup12}")` }}
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup14}
                  />
                </div>
              </div>
              <div
                className="absolute inset-[45.08%_29.55%_54.79%_68.95%]"
                data-node-id="514:11689"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector36}
                />
              </div>
              <div
                className="absolute inset-[45.08%_29.55%_54.79%_68.95%]"
                data-node-id="514:11690"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector37}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute contents inset-[44.38%_28.3%_55.28%_67.64%]"
            data-node-id="518:109"
          >
            <div
              className="absolute contents inset-[44.38%_28.3%_55.28%_67.64%]"
              data-node-id="518:86"
            >
              <div
                className="absolute inset-[44.41%_28.6%_55.31%_67.94%]"
                data-node-id="518:87"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector52}
                />
              </div>
              <div
                className="absolute inset-[44.41%_28.6%_55.31%_67.94%]"
                data-node-id="518:88"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector53}
                />
              </div>
              <div
                className="absolute inset-[44.38%_28.3%_55.28%_67.64%]"
                data-node-id="518:89"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-1.41%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector54} />
                </div>
              </div>
              <div
                className="absolute contents inset-[44.41%_29.97%_55.48%_67.94%]"
                data-node-id="518:90"
              >
                <div
                  className="absolute inset-[44.41%_30.35%_55.5%_67.94%]"
                  data-node-id="518:91"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[285.71%] left-[-35.56%] max-w-none top-[-92.86%] w-[197.78%]"
                      src={imgRectangle}
                    />
                  </div>
                </div>
                <div
                  className="absolute inset-[44.41%_29.97%_55.48%_67.94%]"
                  data-node-id="518:92"
                  data-name="Rectangle"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute h-[219.44%] left-[-43.64%] max-w-none top-[-38.89%] w-[143.64%]"
                      src={imgRectangle1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-[44.46%_29.4%_55.37%_68.93%]"
              data-node-id="518:107"
              data-name="Vector"
            >
              <div className="absolute inset-[-12.85%_-23.13%_-25.7%_-23.13%]">
                <img alt="" className="block max-w-none size-full" src={imgVector55} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute contents left-[calc(50%-0.5px)] top-[calc(35%+323.7px)]"
        data-node-id="520:3"
      >
        <div
          className="-translate-x-1/2 [word-break:break-word] absolute contents left-[calc(50%-1px)] not-italic text-[#565656] text-[20px] text-justify top-[calc(35%+722.7px)]"
          data-node-id="519:332"
        >
          <p
            className="absolute font-['Poppins:Medium'] h-[30px] leading-[1.3] left-[calc(50%-549px)] top-[calc(35%+722.7px)] w-[1096px]"
            data-node-id="519:252"
          >
            Koleksi ikon yang tersedia dalam UI Kit ini dirancang berdasarkan standarisasi kebutuhan
            game edukasi:
          </p>
          <ul
            className="absolute block font-['Poppins:Regular'] h-[240px] leading-[0] left-[calc(50%-549px)] list-disc top-[calc(35%+765.7px)] w-[1096px]"
            data-node-id="519:261"
          >
            <li className="leading-[1.5] mb-0 ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:Bold'] not-italic">
                Research-Based:
              </span>
              {` Ikon-ikon ini dikumpulkan dari hasil analisis berbagai jenis game edukasi anak untuk mencakup kebutuhan fungsi yang paling umum.`}
            </li>
            <li className="leading-[1.5] mb-0 ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:Bold'] not-italic">
                General Reference:
              </span>
              {` Aset ikon yang disajikan berfungsi sebagai gambaran umum dan referensi standar bagi pengembang.`}
            </li>
            <li className="leading-[1.5] mb-0 ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:Bold'] not-italic text-[#107afd]">
                Flexibility:
              </span>
              <span className="text-[#107afd]">{` `}</span>Bentuk dan detail ikon bersifat
              fleksibel; pengguna diperbolehkan untuk memodifikasi atau mengubah bentuk ikon sesuai
              dengan kebutuhan spesifik tema permainan masing-masing.
            </li>
            <li className="leading-[1.5] ms-[30px]">
              <span className="[word-break:break-word] font-['Poppins:SemiBold'] not-italic">
                Consistency:
              </span>
              {` Pastikan ikon tetap menggunakan gaya Solid/Filled agar tetap kontras saat diletakkan di atas tombol.`}
            </li>
          </ul>
        </div>
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-30px)] not-italic text-[#565656] text-[26px] top-[calc(35%+323.7px)] whitespace-nowrap"
          data-node-id="519:259"
        >
          Ikon
        </p>
        <div
          className="-translate-x-1/2 absolute h-[248px] left-[calc(50%-0.5px)] top-[calc(35%+414.7px)] w-[1103px]"
          data-node-id="519:331"
        >
          <div className="absolute inset-[-2.9%_0_-4.03%_0]">
            <img alt="" className="block max-w-none size-full" src={imgFrame125} />
          </div>
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute contents left-[calc(50%-1px)] top-[calc(55%+483.98px)]"
        data-node-id="523:166"
      >
        <p
          className="[word-break:break-word] absolute font-['Poppins:Bold'] leading-[1.2] left-[calc(50%-195px)] not-italic text-[#565656] text-[26px] top-[calc(55%+483.98px)] whitespace-nowrap"
          data-node-id="523:6"
        >
          Contoh Implementasi Button
        </p>
        <div
          className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[60px] items-start left-[calc(50%-1px)] top-[calc(55%+574.98px)] w-[1106px]"
          data-node-id="521:7"
        >
          <div
            className="border border-[#565656] border-solid content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[34px] shrink-0"
            data-node-id="523:117"
          >
            <p
              className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
              data-node-id="523:118"
            >
              Flat Button
            </p>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
            data-node-id="521:8"
          >
            <div
              className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
              data-node-id="521:10"
            >
              <div
                className="col-1 h-[448.032px] ml-[112.01px] mt-0 overflow-clip relative row-1 w-[993.352px]"
                data-node-id="521:11"
                data-name="Frame"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute left-0 max-w-none size-full top-0"
                    src={imgFrame}
                  />
                </div>
                <div
                  className="absolute contents inset-[12.83%_33.94%_43.29%_33.94%]"
                  data-node-id="521:13"
                  data-name="Group"
                >
                  <div
                    className="absolute inset-[12.83%_33.94%_43.29%_33.94%]"
                    data-node-id="521:14"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute left-0 max-w-none size-full top-0"
                        src={imgRectangle2}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute contents inset-[14.1%_34.54%_44.57%_34.52%]"
                    data-node-id="521:15"
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[14.1%_34.54%_44.57%_34.52%]"
                      data-node-id="521:16"
                      data-name="Group"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgGroup17}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute contents inset-[59.01%_43.37%_12.55%_43.37%]"
                  data-node-id="521:174"
                  data-name="Group"
                >
                  <div
                    className="absolute inset-[59.01%_43.37%_12.55%_43.37%]"
                    data-node-id="521:175"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute left-0 max-w-none size-full top-0"
                        src={imgRectangle3}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute contents inset-[60.89%_44.51%_15.77%_44.51%]"
                    data-node-id="521:176"
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[60.89%_44.51%_15.77%_44.51%]"
                      data-node-id="521:177"
                      data-name="Group"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgGroup18}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute contents inset-[3.31%_1.29%_81.94%_91.85%]"
                  data-node-id="521:183"
                  data-name="Group"
                >
                  <div
                    className="absolute inset-[3.31%_1.29%_81.94%_91.85%]"
                    data-node-id="521:184"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute left-0 max-w-none size-full top-0"
                        src={imgRectangle4}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute contents inset-[4.33%_1.97%_83.98%_92.54%]"
                    data-node-id="521:185"
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[4.33%_1.97%_83.98%_92.54%]"
                      data-node-id="521:186"
                      data-name="Group"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgGroup19}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute contents inset-[3.31%_91.85%_81.94%_1.29%]"
                  data-node-id="521:192"
                  data-name="Group"
                >
                  <div
                    className="absolute inset-[3.31%_91.85%_81.94%_1.29%]"
                    data-node-id="521:193"
                    data-name="Rectangle"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute left-0 max-w-none size-full top-0"
                        src={imgRectangle4}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute contents inset-[4.33%_92.54%_83.98%_1.97%]"
                    data-node-id="521:194"
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[4.33%_92.54%_83.98%_1.97%]"
                      data-node-id="521:195"
                      data-name="Group"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgGroup20}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.801px] whitespace-nowrap"
                data-node-id="521:203"
              >
                <p className="leading-[normal] mb-0">Main Menu</p>
                <p className="font-['Poppins:Bold'] leading-[normal]">Flat Button</p>
              </div>
            </div>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
            data-node-id="521:204"
          >
            <div
              className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.801px] whitespace-nowrap"
              data-node-id="521:205"
            >
              <p className="leading-[normal] mb-0">Choosing Topic</p>
              <p className="font-['Poppins:Bold'] leading-[normal]">Flat Button</p>
            </div>
            <div
              className="col-1 h-[448.032px] ml-[113.93px] mt-0 relative row-1 w-[991.318px]"
              data-node-id="521:206"
              data-name="image 1"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt=""
                  className="absolute h-[115.41%] left-[-18.05%] max-w-none top-[-15.41%] w-[140.56%]"
                  src={imgImage1}
                />
              </div>
            </div>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
            data-node-id="521:207"
          >
            <div
              className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.801px] whitespace-nowrap"
              data-node-id="521:208"
            >
              <p className="leading-[normal] mb-0">Choosing Level</p>
              <p className="font-['Poppins:Bold'] leading-[normal]">Flat Button</p>
            </div>
            <div
              className="col-1 h-[446.752px] ml-[113.93px] mt-0 relative row-1 w-[992.016px]"
              data-node-id="521:209"
              data-name="image 2"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt=""
                  className="absolute h-[101.85%] left-[-5.7%] max-w-none top-[-1.85%] w-[113.94%]"
                  src={imgImage2}
                />
              </div>
            </div>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
            data-node-id="521:210"
          >
            <div
              className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.801px] whitespace-nowrap"
              data-node-id="521:211"
            >
              <p className="leading-[normal] mb-0">Gameplay</p>
              <p className="font-['Poppins:Bold'] leading-[normal]">Flat Button</p>
            </div>
            <div
              className="col-1 h-[446.666px] ml-[113.74px] mt-0 relative row-1 w-[991.623px]"
              data-node-id="521:212"
              data-name="image 3"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgImage3}
              />
            </div>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
            data-node-id="521:213"
          >
            <div
              className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.801px] whitespace-nowrap"
              data-node-id="521:214"
            >
              <p className="leading-[normal] mb-0">Gameplay</p>
              <p className="font-['Poppins:Bold'] leading-[normal]">Flat Button</p>
            </div>
            <div
              className="col-1 h-[446.666px] ml-[113.74px] mt-[1.28px] relative row-1 w-[991.623px]"
              data-node-id="521:215"
              data-name="image 4"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgImage4}
              />
            </div>
          </div>
          <div
            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
            data-node-id="521:216"
          >
            <div
              className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.801px] whitespace-nowrap"
              data-node-id="521:217"
            >
              <p className="leading-[normal] mb-0">Result</p>
              <p className="font-['Poppins:Bold'] leading-[normal]">Flat Button</p>
            </div>
            <div
              className="col-1 h-[446.552px] ml-[113.48px] mt-0 relative row-1 w-[991.876px]"
              data-node-id="521:218"
              data-name="Artboard 1 copy 12"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgArtboard1Copy12}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[60px] items-start left-[calc(50%-0.5px)] top-[calc(75%+302.37px)] w-[1105px]"
        data-node-id="521:236"
      >
        <div
          className="border border-[#565656] border-solid content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[34px] shrink-0"
          data-node-id="523:78"
        >
          <p
            className="[word-break:break-word] font-['Poppins:Bold'] leading-[1.2] not-italic relative shrink-0 text-[#565656] text-[24px] whitespace-nowrap"
            data-node-id="523:79"
          >
            Bubble Button
          </p>
        </div>
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-node-id="521:237"
        >
          <div
            className="col-1 h-[447.627px] ml-[112.55px] mt-0 relative row-1 w-[992.454px]"
            data-node-id="521:239"
            data-name="Artboard 1 copy 7"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy7}
            />
          </div>
          <p
            className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.789px] whitespace-nowrap"
            data-node-id="521:240"
          >
            <span className="leading-[normal]">
              Main Menu
              <br aria-hidden />
            </span>
            <span className="font-['Poppins:Bold'] leading-[normal]">Bubble Button</span>
          </p>
        </div>
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-node-id="521:241"
        >
          <p
            className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.789px] whitespace-nowrap"
            data-node-id="521:242"
          >
            <span className="leading-[normal]">
              Choosing Topic
              <br aria-hidden />
            </span>
            <span className="font-['Poppins:Bold'] leading-[normal]">Bubble Button</span>
          </p>
          <div
            className="col-1 h-[447.627px] ml-[112.55px] mt-0 relative row-1 w-[992.454px]"
            data-node-id="521:243"
            data-name="Artboard 1 copy 8"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy8}
            />
          </div>
        </div>
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-node-id="521:244"
        >
          <p
            className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.789px] whitespace-nowrap"
            data-node-id="521:245"
          >
            <span className="leading-[normal]">
              Choosing Level
              <br aria-hidden />
            </span>
            <span className="font-['Poppins:Bold'] leading-[normal]">Bubble Button</span>
          </p>
          <div
            className="col-1 h-[447.627px] ml-[112.55px] mt-0 relative row-1 w-[992.454px]"
            data-node-id="521:246"
            data-name="Artboard 1 copy 9"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy9}
            />
          </div>
        </div>
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-node-id="521:247"
        >
          <p
            className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-0 not-italic relative row-1 text-[#565656] text-[12.789px] whitespace-nowrap"
            data-node-id="521:248"
          >
            <span className="leading-[normal]">
              Gameplay
              <br aria-hidden />
            </span>
            <span className="font-['Poppins:Bold'] leading-[normal]">Bubble Button</span>
          </p>
          <div
            className="col-1 h-[447.627px] ml-[112.55px] mt-0 relative row-1 w-[992.454px]"
            data-node-id="521:249"
            data-name="Artboard 1 copy 10"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy10}
            />
          </div>
        </div>
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-node-id="521:250"
        >
          <p
            className="[word-break:break-word] col-1 font-['Poppins:Medium'] ml-0 mt-[0.12px] not-italic relative row-1 text-[#565656] text-[12.789px] whitespace-nowrap"
            data-node-id="521:251"
          >
            <span className="leading-[normal]">
              Result
              <br aria-hidden />
            </span>
            <span className="font-['Poppins:Bold'] leading-[normal]">Bubble Button</span>
          </p>
          <div
            className="col-1 h-[446.348px] ml-[112.55px] mt-0 relative row-1 w-[991.423px]"
            data-node-id="521:252"
            data-name="Artboard 1 copy 11"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgArtboard1Copy11}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute bg-gradient-to-b bottom-0 from-[rgba(255,255,255,0)] h-[356px] left-0 to-[#107afd] w-[1500px]"
        data-node-id="621:13"
      />
      <div
        className="[word-break:break-word] absolute content-stretch flex flex-col gap-[60px] h-[189px] items-center left-[calc(14.29%-13.29px)] not-italic text-[#565656] top-[calc(95%+334.67px)] w-[1096px]"
        data-node-id="620:12"
      >
        <p
          className="font-['Poppins:Bold'] leading-[1.2] relative shrink-0 text-[26px] text-center w-full"
          data-node-id="620:5"
        >
          Penutup
        </p>
        <p
          className="font-['Poppins:Medium'] h-[78px] leading-[1.3] relative shrink-0 text-[20px] text-justify w-full"
          data-node-id="620:3"
        >
          Dengan mengikuti panduan ini, penggunaan UI Kit Modular diharapkan dapat menghasilkan
          antarmuka game edukasi anak yang konsisten, menarik, mudah dipahami, dan sesuai dengan
          kebutuhan interaksi pengguna anak. Panduan ini juga dapat menjadi acuan bagi desainer
          maupun developer dalam mengembangkan antarmuka game secara lebih efisien.
        </p>
      </div>
    </div>
  );
}
const sections = [
  { label: "Tentang", node: "515:5", color: "#f8b13f" },
  { label: "Filosofi Desain", node: "515:4", color: "#20b2e0" },
  { label: "Palet Warna", node: "520:6", color: "#b1e21d" },
  { label: "Kondisi Tombol", node: "515:2", color: "#fb5252" },
  { label: "Panduan Warna", node: "514:12053", color: "#ff9191" },
  { label: "Panduan Font", node: "523:165", color: "#70c05a" },
  { label: "Aturan Penggunaan", node: "520:2", color: "#c4c4c4" },
  { label: "Ikon", node: "520:3", color: "#4994d1" },
  { label: "Implementasi", node: "523:166", color: "#fad902" },
  { label: "Penutup", node: "620:12", color: "#107afd" },
];

export default function App() {
  const [scale, setScale] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScale = () => setScale(Math.min(1, window.innerWidth / 1500));
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const navigateTo = (node: string) => {
    document.querySelector<HTMLElement>(`[data-node-id="${node}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
  };

  return (
    <main className="guideline-page">
      <nav className={`section-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navigasi panduan UI">
        <button
          className="section-nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="section-nav__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          Daftar isi
        </button>
        <div className="section-nav__panel">
          <p>Jelajahi panduan</p>
          {sections.map((section) => (
            <button key={section.node} type="button" onClick={() => navigateTo(section.node)}>
              <span style={{ backgroundColor: section.color }} aria-hidden="true" />
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="artboard-shell" style={{ width: 1500 * scale, height: 17578 * scale }}>
        <div className="artboard-scale" style={{ transform: `scale(${scale})` }}>
          <UserGuideline />
        </div>
      </div>
    </main>
  );
}
