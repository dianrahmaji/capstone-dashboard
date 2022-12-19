/* eslint-disable camelcase */
import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import useSelectedTeam from "~/hooks/useSelectedTeam";

export default function Contributions() {
  const { members } = useSelectedTeam();

  const data = members.map((m) => ({
    ...m,
    pictureSettings: {
      src: "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png",
    },
  }));

  useLayoutEffect(() => {
    const root = am5.Root.new("contribution_chart");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: false,
        wheelY: false,
        paddingLeft: 50,
        paddingRight: 40,
      }),
    );

    const xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("strokeDasharray", [3]);

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: xRenderer,
      }),
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("visible", false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "fullName",
        renderer: yRenderer,
        paddingRight: 40,
      }),
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Contributions",
        xAxis,
        yAxis,
        valueXField: "contributions",
        categoryYField: "fullName",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: "vertical",
          labelText: "{valueX} Jam",
        }),
      }),
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxHeight: 50,
      fillOpacity: 0.8,
    });

    let currentlyHovered;

    function handleOut() {
      if (currentlyHovered) {
        const bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationX",
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    function handleHover(dataItem) {
      if (dataItem && currentlyHovered !== dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        const bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationX",
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    series.columns.template.events.on("pointerover", (e) => {
      handleHover(e.target.dataItem);
    });

    series.columns.template.events.on("pointerout", () => {
      handleOut();
    });

    const circleTemplate = am5.Template.new({});

    // eslint-disable-next-line no-unused-vars
    series.bullets.push((root, series, dataItem) => {
      const bulletContainer = am5.Container.new(root, {});

      bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 34,
          },
          circleTemplate,
        ),
      );

      const maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 }),
      );

      const imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
        }),
      );

      imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60,
        }),
      );

      return am5.Bullet.new(root, {
        locationX: 0,
        sprite: bulletContainer,
      });
    });

    series.set("heatRules", [
      {
        dataField: "valueX",
        min: am5.color(0xfdcb2c),
        max: am5.color(0x073c64),
        target: series.columns.template,
        key: "fill",
      },
      {
        dataField: "valueX",
        min: am5.color(0xfdcb2c),
        max: am5.color(0x073c64),
        target: circleTemplate,
        key: "fill",
      },
    ]);

    series.data.setAll(data);
    yAxis.data.setAll(data);

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    cursor.events.on("cursormoved", () => {
      const { dataItem } = series.get("tooltip");

      if (dataItem) {
        handleHover(dataItem);
      } else {
        handleOut();
      }
    });

    series.appear();
    chart.appear(1000, 100);

    return () => root.dispose();
  });

  return (
    <div>
      <h2 className="mt-3 text-xl font-medium">Kontribusi</h2>
      <div id="contribution_chart" className="h-[500px] w-full" />
    </div>
  );
}
