 
import React, { useEffect } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceNumber,
  useViewModelInstanceTrigger,
} from "@rive-app/react-webgl2";
 

export default function RiveBar() {
  const { rive, RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: "rive/flashlight.riv",
    // Be sure to specify the correct state machine (or animation) name
    stateMachines: "State Machine 1",
    // This is optional.Provides additional layout control.
    layout: new Layout({
      fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
      layoutScaleFactor: 14,
    }),
    // Autoplay the state machine
    autoplay: true,
    // This uses the view model instance defined in Rive
    autoBind: true,
  });

  const viewModel = useViewModel(rive, { name: "health_bar_01" });
  const vmi = useViewModelInstance(viewModel, { rive });

  const { value: health, setValue: setHealth } = useViewModelInstanceNumber(
    "health",
    vmi
  );

  const { trigger: triggerGameOver } = useViewModelInstanceTrigger(
    "gameOver",
    vmi,
    {
      // Listen for the trigger getting fired from within Rive
      // Ex: When health is 0 and you click the `No` button
      onTrigger: () => {
        console.log("Trigger Fired!");
      },
    }
  );

  useEffect(() => {
    setHealth(10);
  }, [rive, setHealth]);

  return (
    <>
      {/* <div className="w-full h-full"> */}
        <RiveComponent />
      {/* </div> */}
      
    </>
  );
}
