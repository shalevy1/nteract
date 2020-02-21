import * as Immutable from "immutable";
import { makeMakeRootEpic } from "./epics";
import { makeCreateMyth } from "./myth";
import { makeRootReducer } from "./reducer";
import { MythicPackage, Myths, PackageDefinition } from "./types";

export const createMythicPackage =
  <PKG extends string>(pkg: PKG) =>
    <STATE>(
      packageDefinition: PackageDefinition<STATE>,
    ): MythicPackage<PKG, STATE> => {
      const myths: Myths<PKG, STATE> = {};

      return {
        name: pkg,
        myths,

        // for use in typeof expressions:
        state: undefined as unknown as STATE,

        makeStateRecord: Immutable.Record<STATE>(
          packageDefinition.initialState,
        ),

        makeRootEpic:
          makeMakeRootEpic(myths),

        rootReducer:
          makeRootReducer(myths, packageDefinition.initialState),

        createMyth:
          makeCreateMyth(pkg, myths),
      };
    };
