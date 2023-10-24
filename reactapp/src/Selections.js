import React, { useState, useEffect } from "react";
import Select from "react-select";
import ImageGallery from "./ImageGallery";

const Selections = ({ proprietary = false }) => {
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
  // const url = "http://18.119.115.197:8080";

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
    <div style={{ width: 380 }}>
      <br />
      <form>
        <label>
          Symbol Set:
          <Select
            options={symset.options}
            isSearchable={true}
            value={symset.selection}
            onChange={(selectedoption) =>
              setSymset({ ...symset, selection: selectedoption })
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
              setIcon({ ...icon, selection: selectedoption })
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
              setFirstid({ ...firstid, selection: selectedoption })
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
              })
            }
          />
        </label>
        <label>
          Echelon/Mobility:
          <Select
            options={echelonmobility.options}
            value={echelonmobility.selection}
            isSearchable={true}
            isClearable={true}
            onChange={(selectedoption) =>
              setEchelonmobility({
                ...echelonmobility,
                selection: selectedoption,
              })
            }
          />
        </label>
        <label>
          Modifier 1:
          <Select
            options={modifierone.options}
            value={modifierone.selection}
            isSearchable={true}
            onChange={(selectedoption) =>
              setModifierone({ ...modifierone, selection: selectedoption })
            }
          />
        </label>
        <label>
          Modifier 2:
          <Select
            options={modifiertwo.options}
            value={modifiertwo.selection}
            isSearchable={true}
            onChange={(selectedoption) =>
              setModifiertwo({ ...modifiertwo, selection: selectedoption })
            }
          />
        </label>
      </form>
      <br />
      {sidcList.length > 0 && (
        <ImageGallery
          key={proprietary}
          proprietary={proprietary}
          sidcList={sidcList}
        />
      )}
    </div>
  );
};

export default Selections;
