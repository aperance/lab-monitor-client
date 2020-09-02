import * as z from "zod";

const config =
  process.env.DEMO !== "true"
    ? require("../../config.json")
    : {
        title: "QA Lab Monitor",
        columns: [
          { property: "serial", title: "Serial #" },
          { property: "ipAddress", title: "IP Address" },
          { property: "timestamp", title: "Updated At" },
          { property: "hardware", title: "Hardware" },
          { property: "firmware", title: "Firmware" },
          { property: "propertyA", title: "Property A" },
          { property: "propertyB", title: "Property B" },
          { property: "propertyC", title: "Property C" }
        ],
        filters: [
          {
            property: "hardware",
            title: "Hardware",
            options: {
              "Rev A": "Rev A",
              "Rev B": "Rev B",
              "Rev C": "Rev C",
              "Rev D": "Rev D",
              "Rev E": "Rev E"
            }
          },
          {
            property: "firmware",
            title: "Firmware",
            options: {
              "v1.0.5": "v1.0.5",
              "v2.0.4": "v2.0.4",
              "v3.0.3": "v3.0.3",
              "v4.0.2": "v4.0.2",
              "v5.0.1": "v5.0.1"
            }
          }
        ],
        logLevel: {
          level: ["x", "y", "z"],
          namespace: ["x", "y", "z"]
        }
      };

const schema = z.object({
  title: z.string(),
  columns: z.array(
    z.object({
      property: z.string(),
      title: z.string(),
      replace: z.record(z.string()).optional()
    })
  ),
  filters: z.array(
    z.object({
      property: z.string(),
      title: z.string(),
      options: z.record(z.string())
    })
  ),
  logLevel: z.object({
    level: z.array(z.string()),
    namespace: z.array(z.string())
  }),
  logsPath: z.string().optional(),
  statePath: z.string().optional(),
  psTools: z
    .record(
      z.object({
        name: z.string(),
        mode: z.string(),
        cmd: z.string()
      })
    )
    .optional(),
  remoteAccess: z
    .object({
      username: z.string(),
      password: z.string()
    })
    .optional()
});

export default schema.parse(config);
