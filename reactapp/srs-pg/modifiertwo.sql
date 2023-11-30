begin;

CREATE TABLE IF NOT EXISTS modifiertwo
(
    code VARCHAR NOT NULL,
    symbolset VARCHAR NOT NULL,
    description VARCHAR,
    category VARCHAR
);
INSERT INTO MODIFIERTWO (symbolset,code,description,category) VALUES ('10','00','UNSPECIFIED',''),
('10','01','AIRBORNE','MOBILITY'),
('10','02','ARCTIC','MOBILITY'),
('10','03','BATTLE DAMAGE REPAIR','CAPABILITY'),
('10','04','BICYCLE EQUIPPED','MOBILITY'),
('10','05','CASUALTY STAGING','CAPABILITY'),
('10','06','CLEARING','CAPABILITY'),
('10','07','CLOSE RANGE','CAPABILITY'),
('10','08','CONTROL','CAPABILITY'),
('10','09','DECONTAMINATION','CAPABILITY'),
('10','10','DEMOLITION','CAPABILITY'),
('10','11','DENTAL','CAPABILITY'),
('10','12','DIGITAL','CAPABILITY'),
('10','13','ENHANCED POSITION LOCATION REPORTING SYSTEM (EPLRS)','CAPABILITY'),
('10','14','EQUIPMENT','CAPABILITY'),
('10','15','HEAVY','CAPABILITY'),
('10','16','HIGH ALTITUDE','CAPABILITY'),
('10','17','INTERMODAL','CAPABILITY'),
('10','18','INTENSIVE CARE','CAPABILITY'),
('10','19','LIGHT','CAPABILITY'),
('10','20','LABORATORY','CAPABILITY'),
('10','21','LAUNCHER','CAPABILITY'),
('10','22','LONG RANGE','CAPABILITY'),
('10','23','LOW ALTITUDE','CAPABILITY'),
('10','24','MEDIUM','CAPABILITY'),
('10','25','MEDIUM ALTITUDE','CAPABILITY'),
('10','26','MEDIUM RANGE','CAPABILITY'),
('10','27','MOUNTAIN','CAPABILITY'),
('10','28','HIGH TO MEDIUM ALTITUDE','CAPABILITY'),
('10','29','MULTI–CHANNEL','CAPABILITY'),
('10','30','OPTICAL (FLASH)','CAPABILITY'),
('10','31','PACK ANIMAL','CAPABILITY'),
('10','32','PATIENT EVACUATION COORDINATION','CAPABILITY'),
('10','33','PREVENTIVE MAINTENANCE','CAPABILITY'),
('10','34','PSYCHOLOGICAL','CAPABILITY'),
('10','35','RADIO RELAY LINE OF SIGHT','CAPABILITY'),
('10','36','RAILROAD','MOBILITY'),
('10','37','RECOVERY (UNMANNED SYSTEMS)','CAPABILITY'),
('10','38','RECOVERY (MAINTENANCE)','CAPABILITY'),
('10','39','RESCUE COORDINATION CENTER','CAPABILITY'),
('10','40','RIVERINE','MOBILITY'),
('10','41','SINGLE CHANNEL','CAPABILITY'),
('10','42','SKI','CAPABILITY'),
('10','43','SHORT RANGE','CAPABILITY'),
('10','44','STRATEGIC','CAPABILITY'),
('10','45','SUPPORT','CAPABILITY'),
('10','46','TACTICAL','CAPABILITY'),
('10','47','TOWED','MOBILITY'),
('10','48','TROOP','CAPABILITY'),
('10','49','VERTICAL OR SHORT TAKE–OFF AND LANDING (VTOL/VSTOL)','MOBILITY'),
('10','50','VETERINARY','CAPABILITY'),
('10','51','WHEELED','MOBILITY'),
('10','52','HIGH TO LOW ALTITUDE','CAPABILITY'),
('10','53','MEDIUM TO LOW ALTITUDE','CAPABILITY'),
('10','54','ATTACK','CAPABILITY'),
('10','55','REFUEL','CAPABILITY'),
('10','56','UTILITY','CAPABILITY'),
('10','57','COMBAT SEARCH AND RESCUE','CAPABILITY'),
('10','58','GUERILLA','CAPABILITY'),
('10','59','AIR ASSAULT','MOBILITY'),
('10','60','AMPHIBIOUS','MOBILITY'),
('10','61','VERY HEAVY','CAPABILITY'),
('10','62','SUPPLY','CAPABILITY'),
('10','63','CYBERSPACE','CAPABILITY'),
('10','64','NAVY BARGE',' SELF-PROPELLED'),
('10','65','NAVY BARGE',' NOT SELF-PROPELLED'),
('10','66','LAUNCH','MOBILITY'),
('10','67','LANDING CRAFT','MOBILITY'),
('10','68','LANDING SHIP','MOBILITY'),
('10','69','SERVICE CRAFT/YARD','MOBILITY'),
('10','70','TUG HARBOR','MOBILITY'),
('10','71','OCEAN GOING TUG BOAT','MOBILITY'),
('10','72','SURFACE DEPLOYMENT AND DISTRIBUTION COMMAND','CAPABILITY'),
('10','73','NONCOMBATANT GENERIC VESSEL','MOBILITY'),
('10','74','COMPOSITE','CAPABILITY'),
('10','75','SHELTER','CAPABILITY'),
('10','76','LIGHT AND MEDIUM','CAPABILITY'),
('10','77','TRACKED','MOBILITY'),
('10','78','SECURITY FORCE ASSISTANCE','CAPABILITY'),
('11','00','UNSPECIFIED',''),
('11','01','LEADER OR LEADERSHIP','ORGANIZATION'),
('11','02','CYBERSPACE','CAPABILITY'),
('15','00','UNSPECIFIED',''),
('15','01','CYBERSPACE','CAPABILITY'),
('15','02','LIGHT','CAPABILITY'),
('15','03','MEDIUM','CAPABILITY'),
('15','04','RAILWAY','CAPABILITY'),
('15','05','TRACKED','CAPABILITY'),
('15','06','TRACTOR TRAILER','CAPABILITY'),
('15','07','WHEELED LTD','CAPABILITY'),
('15','08','WHEELED X','CAPABILITY'),
('15','09','ROBOTIC','CAPABILITY'),
('20','00','UNSPECIFIED',''),
('20','01','BIOLOGICAL WARFARE PRODUCTION','CAPABILITY'),
('20','02','CHEMICAL WARFARE PRODUCTION','CAPABILITY'),
('20','03','NUCLEAR WARFARE PRODUCTION','CAPABILITY'),
('20','04','RADIOLOGICAL WARFARE PRODUCTION','CAPABILITY'),
('20','05','ATOMIC ENERGY REACTOR','CAPABILITY'),
('20','06','NUCLEAR MATERIAL PRODUCTION','CAPABILITY'),
('20','07','NUCLEAR MATERIAL STORAGE','CAPABILITY'),
('20','08','WEAPONS GRADE PRODUCTION','CAPABILITY'),
('20','09','CYBERSPACE','CAPABILITY'),
('30','00','UNSPECIFIED',''),
('30','01','NUCLEAR POWERED','SHIP PROPULSION'),
('30','02','HEAVY','SHIP CAPACITY'),
('30','03','LIGHT','SHIP CAPACITY'),
('30','04','MEDIUM','SHIP CAPACITY'),
('30','05','DOCK','CARGO CAPACITY'),
('30','06','LOGISTICS','CARGO CAPACITY'),
('30','07','TANK','CARGO CAPACITY'),
('30','08','VEHICLE','CARGO CAPACITY'),
('30','09','FAST','SHIP MOBILITY'),
('30','10','AIR–CUSHIONED (US)','SHIP MOBILITY'),
('30','11','AIR–CUSHIONED (NATO)','SHIP MOBILITY'),
('30','12','HYDROFOIL','SHIP MOBILITY'),
('30','13','AUTONOMOUS CONTROL','USV CONTROL'),
('30','14','REMOTELY PILOTED','USV CONTROL'),
('30','15','EXPENDABLE','USV CONTROL'),
('30','16','CYBERSPACE','CAPABILITY'),
('35','00','UNSPECIFIED',''),
('35','01','AIR INDEPENDENT PROPULSION','SHIP PROPULSION'),
('35','02','DIESEL ELECTRIC',' GENERAL'),
('35','03','DIESEL – TYPE 1','SHIP PROPULSION'),
('35','04','DIESEL – TYPE 2','SHIP PROPULSION'),
('35','05','DIESEL – TYPE 3','SHIP PROPULSION'),
('35','06','NUCLEAR POWERED',' GENERAL'),
('35','07','NUCLEAR – TYPE 1','SHIP PROPULSION'),
('35','08','NUCLEAR – TYPE 2','SHIP PROPULSION'),
('35','09','NUCLEAR – TYPE 3','SHIP PROPULSION'),
('35','10','NUCLEAR – TYPE 4','SHIP PROPULSION'),
('35','11','NUCLEAR – TYPE 5','SHIP PROPULSION'),
('35','12','NUCLEAR – TYPE 6','SHIP PROPULSION'),
('35','13','NUCLEAR – TYPE 7','SHIP PROPULSION'),
('35','14','AUTONOMOUS CONTROL','UUV CONTROL'),
('35','15','REMOTELY PILOTED','UUV CONTROL'),
('35','16','EXPENDABLE','UUV CONTROL'),
('35','17','CYBERSPACE','CAPABILITY'),
('40','00','UNSPECIFIED',''),
('40','01','CYBERSPACE','CAPABILITY'),
('40','02','SECURITY FORCE ASSISTANCE','CAPABILITY'),
('50','00','UNSPECIFIED',''),
('50','01','CYBERSPACE','CAPABILITY'),
('51','00','UNSPECIFIED',''),
('51','01','CYBERSPACE','CAPABILITY'),
('52','00','UNSPECIFIED',''),
('52','01','CYBERSPACE','CAPABILITY'),
('53','00','UNSPECIFIED',''),
('53','01','CYBERSPACE','CAPABILITY'),
('54','00','UNSPECIFIED',''),
('54','01','CYBERSPACE','CAPABILITY'),
('01','00','NOT APPLICABLE',''),
('01','01','HEAVY','CARGO/TRANSPORT CAPACITY'),
('01','02','MEDIUM','CARGO/TRANSPORT CAPACITY'),
('01','03','LIGHT','CARGO/TRANSPORT CAPACITY'),
('01','04','BOOM–ONLY','RE-FUELING CAPABILITY'),
('01','05','DROGUE–ONLY','RE-FUELING CAPABILITY'),
('01','06','BOOM AND DROGUE','RE-FUELING CAPABILITY'),
('01','07','CLOSE RANGE','RANGE'),
('01','08','SHORT RANGE','RANGE'),
('01','09','MEDIUM RANGE','RANGE'),
('01','10','LONG RANGE','RANGE'),
('01','11','DOWNLINKED','TRACK LINK AVAILABILITY'),
('01','12','CYBERSPACE','CAPABILITY'),
('02','00','UNSPECIFIED',''),
('02','01','AIR','MISSILE DESTINATION'),
('02','02','SURFACE','MISSILE DESTINATION'),
('02','03','SUBSURFACE','MISSILE DESTINATION'),
('02','04','SPACE','MISSILE DESTINATION'),
('02','05','LAUNCHED','MISSILE STATUS'),
('02','06','MISSILE','MISSILE STATUS'),
('02','07','PATRIOT','MISSILE TYPE-BMD'),
('02','08','STANDARD MISSILE-2 (SM-2)','MISSILE TYPE-AAW'),
('02','09','STANDARD MISSILE-6 (SM-6)','MISSILE TYPE-AAW'),
('02','10','EVOLVED SEA SPARROW MISSILE (ESSM)','MISSILE TYPE-AAW'),
('02','11','ROLLING AIRFRAME MISSILE (RAM)','MISSILE TYPE-AAW'),
('02','12','SHORT RANGE','MISSILE RANGE'),
('02','13','MEDIUM RANGE','MISSILE RANGE'),
('02','14','INTERMEDIATE RANGE','MISSILE RANGE'),
('02','15','LONG RANGE','MISSILE RANGE'),
('02','16','INTERCONTINENTAL','MISSILE RANGE'),
('05','00','UNSPECIFIED',''),
('05','01','OPTICAL','SENSOR'),
('05','02','INFRARED','SENSOR'),
('05','03','RADAR','SENSOR'),
('05','04','SIGNALS INTELLIGENCE (SIGINT)','SENSOR'),
('05','05','CYBERSPACE','CAPABILITY'),
('06','00','UNSPECIFIED',''),
('06','01','SHORT RANGE','MISSILE RANGE'),
('06','02','MEDIUM RANGE','MISSILE RANGE'),
('06','03','INTERMEDIATE RANGE','MISSILE RANGE'),
('06','04','LONG RANGE','MISSILE RANGE'),
('06','05','INTERCONTINENTAL ','MISSILE RANGE'),
('06','06','ARROW','MISSILE TYPE-BMD'),
('06','07','GROUND-BASED INTERCEPTOR (GBI)','MISSILE TYPE-BMD'),
('06','08','PATRIOT','MISSILE TYPE-BMD'),
('06','09','STANDARD MISSILE TERMINAL PHASE (SM-T)','MISSILE TYPE-BMD'),
('06','10','STANDARD MISSILE – 3 (SM-3)','MISSILE TYPE-BMD'),
('06','11','TERMINAL HIGH ALTITUDE AREA DEFENSE (THAAD)','MISSILE TYPE-BMD'),
('06','12','SPACE','LAUNCH ORIGIN'),
('06','13','CLOSE RANGE (CRBM)','MISSILE RANGE'),
('06','14','DEBRIS','MISSILE TYPE-BMD'),
('06','15','UNKNOWN','MISSILE TYPE-BMD');
commit;