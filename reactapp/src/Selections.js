import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import ImageGallery from "./ImageGallery";

import "rsuite/dist/rsuite.min.css";

const Selections = ({ proprietary = false }) => {
  const [selectedList] = useState([]);
  const [sidcList, setSidcList] = useState([]);
  const [symset, setSymset] = useState({
    options: [],
    selection: {},
  });
  const [icon, setIcon] = useState({ options: [], selection: {} });
  const [firstid, setFirstid] = useState({
    options: [],
    selection: {},
  });
  const [affiliation, setAffiliation] = useState({
    options: [],
    selection: {},
  });
  const [status, setStatus] = useState({
    options: [],
    selection: {},
  });
  const [hqtfdummy, setHqtfdummy] = useState({
    options: [],
    selection: {},
  });
  const [echelonmobility, setEchelonmobility] = useState({
    options: [],
    selection: {},
  });
  const [modifierone, setModifierone] = useState({
    options: [],
    selection: {},
  });
  const [modifiertwo, setModifiertwo] = useState({
    options: [],
    selection: {},
  });

  const url = "http://18.189.126.187:8080";
  // const url = "http://localhost:8080";

  useEffect(() => {
    // load symbol sets
    fetch(`${url}/sym`)
      .then((response) => response.json())
      .then((data) =>
        setSymset({
          options: data.map((ele) => {
            return { value: ele[0], label: ele[1] };
          }),
          selection: { value: data[0][0], label: data[0][1] },
        })
      )
      .catch((err) => console.log(err.message));

    // load reality/exercise/simulation
    fetch(`${url}/firstid`)
      .then((response) => response.json())
      .then((data) =>
        setFirstid({
          options: data.map((ele) => {
            return { value: ele[0], label: ele[1] };
          }),
          selection: { value: data[0][0], label: data[0][1] },
        })
      )
      .catch((err) => console.log(err.message));

    // load affiliation
    fetch(`${url}/affiliation`)
      .then((response) => response.json())
      .then((data) =>
        setAffiliation({
          options: data.map((ele) => {
            return { value: ele[0], label: ele[1] };
          }),
          selection: { value: data[0][0], label: data[0][1] },
        })
      )
      .catch((err) => console.log(err.message));

    // load status
    fetch(`${url}/status`)
      .then((response) => response.json())
      .then((data) =>
        setStatus({
          options: data.map((ele) => {
            return { value: ele[0], label: ele[1] };
          }),
          selection: { value: data[0][0], label: data[0][1] },
        })
      )
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const sym = symset.selection?.value;

    if (sym) {
      // load icon
      fetch(`${url}/icon?sym=${sym}`)
        .then((response) => response.json())
        .then((data) =>
          setIcon({
            options: data.map((ele) => {
              return { value: ele[0], label: ele[1] };
            }),
            selection: { value: data[0][0], label: data[0][1] },
          })
        )
        .catch((err) => console.log(err.message));

      // load hqtfdummy
      fetch(`${url}/hqtfdummy?sym=${sym}`)
        .then((response) => response.json())
        .then((data) =>
          setHqtfdummy({
            options: data.map((ele) => {
              return { value: ele[0], label: ele[1] };
            }),
            selection: { value: data[0][0], label: data[0][1] },
          })
        )
        .catch((err) => console.log(err.message));

      // load echelonmobility
      fetch(`${url}/echelonmobility?sym=${sym}`)
        .then((response) => response.json())
        .then((data) =>
          setEchelonmobility({
            options: data.map((ele) => {
              return { value: ele[0], label: ele[1] };
            }),
            selection: { value: data[0][0], label: data[0][1] },
          })
        )
        .catch((err) => console.log(err.message));

      // load modifierone
      fetch(`${url}/modifierone?sym=${sym}`)
        .then((response) => response.json())
        .then((data) =>
          setModifierone({
            options: data.map((ele) => {
              return { value: ele[0], label: ele[1] };
            }),
            selection: { value: data[0][0], label: data[0][1] },
          })
        )
        .catch((err) => console.log(err.message));

      // load modifiertwo
      fetch(`${url}/modifiertwo?sym=${sym}`)
        .then((response) => response.json())
        .then((data) =>
          setModifiertwo({
            options: data.map((ele) => {
              return { value: ele[0], label: ele[1] };
            }),
            selection: { value: data[0][0], label: data[0][1] },
          })
        )
        .catch((err) => console.log(err.message));
    }
  }, [symset]);

  useEffect(() => {
    const sidcStarter = [];

    const firstids = firstid.selection
      ? [firstid.selection.value]
      : firstid.options.map((fid) => fid.value);
    const affiliations = affiliation.selection
      ? [affiliation.selection.value]
      : affiliation.options.map((aff) => aff.value);
    const statuses = status.selection
      ? [status.selection.value]
      : status.options.map((sts) => sts.value);
    const hqtfdummies = hqtfdummy.selection
      ? [hqtfdummy.selection.value]
      : hqtfdummy.options.map((hqtfd) => hqtfd.value);
    const echelonmobilities = echelonmobility.selection
      ? [echelonmobility.selection.value]
      : echelonmobility.options.map((em) => em.value);

    for (var fid of firstids) {
      for (var aff of affiliations) {
        for (var sts of statuses) {
          for (var hqtfd of hqtfdummies) {
            for (var em of echelonmobilities) {
              sidcStarter.push(
                `30${fid}${aff}${symset.selection?.value}${sts}${hqtfd}${em}${icon.selection?.value}${modifierone.selection?.value}${modifiertwo.selection?.value}`
              );
            }
          }
        }
      }
    }

    setSidcList(sidcStarter);
  }, [
    firstid,
    affiliation,
    symset,
    status,
    hqtfdummy,
    echelonmobility,
    icon,
    modifierone,
    modifiertwo,
  ]);

  return (
    <Fragment>
      <div
        id={"selectionsDiv"}
        style={{
          marginLeft: "35px",
          width: "500px",
          height: "1000px",
          backgroundColor: "beige",
        }}
      >
        <br />
        <form
          style={{
            width: "450px",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >
          <label>
            Symbol Set:
            <Select
              options={symset.options}
              isSearchable={true}
              value={symset.selection}
              onChange={(selectedoption) =>
                setSymset({
                  ...symset,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Icon:
            <Select
              options={icon.options}
              value={icon.selection}
              isSearchable={true}
              onChange={(selectedoption) =>
                setIcon({
                  ...icon,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Reality/Exercise/Simulation:
            <Select
              options={firstid.options}
              value={firstid.selection}
              isSearchable={true}
              isClearable={true}
              onChange={(selectedoption) =>
                setFirstid({
                  ...firstid,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Affiliation:
            <Select
              options={affiliation.options}
              value={affiliation.selection}
              isSearchable={true}
              isClearable={true}
              onChange={(selectedoption) =>
                setAffiliation({
                  ...affiliation,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Status:
            <Select
              options={status.options}
              value={status.selection}
              isSearchable={true}
              isClearable={true}
              onChange={(selectedoption) =>
                setStatus({
                  ...status,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            HQ/TF/Dummy:
            <Select
              options={hqtfdummy.options}
              value={hqtfdummy.selection}
              isSearchable={true}
              isClearable={true}
              onChange={(selectedoption) =>
                setHqtfdummy({
                  ...hqtfdummy,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Echelon/Mobility:
            <Select
              menuPlacement={"top"}
              options={echelonmobility.options}
              value={echelonmobility.selection}
              isSearchable={true}
              isClearable={true}
              onChange={(selectedoption) =>
                setEchelonmobility({
                  ...echelonmobility,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Modifier 1:
            <Select
              menuPlacement={"top"}
              options={modifierone.options}
              value={modifierone.selection}
              isSearchable={true}
              onChange={(selectedoption) =>
                setModifierone({
                  ...modifierone,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
          <label>
            Modifier 2:
            <Select
              menuPlacement={"top"}
              options={modifiertwo.options}
              value={modifiertwo.selection}
              isSearchable={true}
              onChange={(selectedoption) =>
                setModifiertwo({
                  ...modifiertwo,
                  selection: selectedoption,
                  ...selectedList.push(Array(selectedoption).pop().label),
                })
              }
            />
          </label>
        </form>
        <br />
      </div>
      <div
        id={"selImgDiv"}
        style={{
          backgroundColor: "#F4F6F7",
          flexGrow: "1",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {sidcList.length > 0 && (
          <ImageGallery
            id={"imgGal"}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            key={proprietary}
            proprietary={proprietary}
            sidcList={sidcList}
            selectionsList={selectedList
              .toString()
              .replace(/,/g, "\n")
              .toUpperCase()}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Selections;
