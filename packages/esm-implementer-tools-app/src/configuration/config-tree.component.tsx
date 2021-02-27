import React from "react";
import styles from "./configuration.styles.css";
import Accordion, {
  AccordionItem,
} from "carbon-components-react/es/components/Accordion";
import { ConfigTreeForModule } from "./config-tree-for-module.component";
import { useStore } from "@openmrs/esm-framework";
import { implementerToolsStore } from "../store";

export interface ConfigTreeProps {
  config: Record<string, any>;
}

export function ConfigTree({ config }: ConfigTreeProps) {
  const { slotsByModule } = useStore(implementerToolsStore);

  return (
    <div>
      <Accordion align="start">
        {config &&
          Object.keys(config)
            .sort()
            .map((moduleName) => {
              const moduleConfig = config[moduleName];
              return Object.keys(moduleConfig).length ||
                slotsByModule[moduleName] ? (
                <AccordionItem
                  open
                  title={<h4 className={styles.moduleName}>{moduleName}</h4>}
                  className={styles.fullWidthAccordion}
                  key={`accordion-${moduleName}`}
                >
                  <div key={`${moduleName}-config`}>
                    <ConfigTreeForModule
                      config={moduleConfig}
                      moduleName={moduleName}
                    />
                  </div>
                </AccordionItem>
              ) : null;
            })}
      </Accordion>
    </div>
  );
}
