import { savingsPercent } from "@/lib/helpers/priceDiscount";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20, // smaller padding
    fontSize: 9, // base font smaller
    fontFamily: "Helvetica",
    color: "#0f172a",
  },

  hero: {
    height: 150, // smaller hero
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: { color: "white", fontSize: 18, fontWeight: "bold" },
  subtitle: { color: "white", fontSize: 9, opacity: 0.9 },

  container: { flexDirection: "row", gap: 10 },
  leftCol: { width: "65%" },
  rightCol: { width: "35%" },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid",
    paddingBottom: 3,
    marginBottom: 6,
  },

  overviewText: { color: "#475569", textAlign: "justify", fontSize: 8 },

  itineraryRow: { flexDirection: "row", marginBottom: 8 },
  itineraryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "black",
    marginRight: 6,
    marginTop: 3,
  },
  dayLabel: {
    fontWeight: "bold",
    color: "#1d4ed8",
    fontSize: 8,
    textTransform: "uppercase",
  },
  dayDesc: { color: "#475569", fontSize: 8, marginTop: 1 },

  box: {
    padding: 6, // smaller padding
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 6, // smaller margin
  },

  listItem: {
    flexDirection: "row",
    marginBottom: 2,
  },

  bullet: {
    fontSize: 8,
    marginRight: 3,
  },

  listText: {
    fontSize: 8,
    flex: 1,
  },
  blueBox: { backgroundColor: "#f8fafc", borderColor: "#e2e8f0" },
  greenBox: { backgroundColor: "#f0fdf4", borderColor: "#dcfce7" },
  redBox: { backgroundColor: "#fef2f2", borderColor: "#fee2e2" },
  yellowBox: { backgroundColor: "#fefce8", borderColor: "#fef9c3" },
  boxTitle: { fontWeight: "bold", marginBottom: 3, fontSize: 10 },
});

let importantNotes = {
  rules: [
    "TMTT terms and conditions apply.",
    "Price subject to 8% SST if applicable.",
    "Price is correct at time of printing; subject to change without notice.",
    "FIT to group conversion: No cash refund for price difference.",
    "All promo packages are non-refundable & non-reroutable.",
    "No refund for Positive Covid-19 cases.",
    "Subject to Akta Industri Pelancongan 1992.",
  ],
  remarks: [
    "Price per person based on twin sharing.",
    "Tipping must be collected before departure.",
    "Travel insurance is compulsory.",
    "Triple room (extra bed) uses roller bed / mattress.",
    "Credit card payments impose a 2% fee.",
    "Note: Nyepi Day is 19–20 March 2026.",
  ],
  payment: [
    "Deposit (RM100) is strictly non-refundable.",
    "Full payment required before promotion due date.",
    "90 days before departure: Full payment must be received to avoid automatic cancellation.",
    "Hotel confirmation subject to availability at booking time.",
  ],
  cancellation: [
    "Must be made in writing/email to TM Tours & Travel Sdn. Bhd.",
    "Refund process: 21–31 working days.",
    "Subject to airlines & ground operators’ approval.",
    "Full refunds only considered for death (with documentation).",
  ],
};

export const PackagePDF = ({ data }: { data: any }) => {
  const importantNotes = {
    rules: [
      "TMTT terms and conditions apply.",
      "Price subject to 8% SST if applicable.",
      "Price is correct at time of printing; subject to change without notice.",
      "FIT to group conversion: No cash refund for price difference.",
      "All promo packages are non-refundable & non-reroutable.",
      "No refund for Positive Covid-19 cases.",
      "Subject to Akta Industri Pelancongan 1992.",
    ],
    remarks: [
      "Price per person based on twin sharing.",
      "Tipping must be collected before departure.",
      "Travel insurance is compulsory.",
      "Triple room (extra bed) uses roller bed / mattress.",
      "Credit card payments impose a 2% fee.",
      ...(data.additional_remarks || []),
    ],
    payment: [
      "Deposit (RM100) is strictly non-refundable.",
      "Full payment required before promotion due date.",
      "90 days before departure: Full payment must be received to avoid automatic cancellation.",
      "Hotel confirmation subject to availability at booking time.",
    ],
    cancellation: [
      "Must be made in writing/email to TM Tours & Travel Sdn. Bhd.",
      "Refund process: 21–31 working days.",
      "Subject to airlines & ground operators’ approval.",
      "Full refunds only considered for death (with documentation).",
    ],
  };

  return (
    <Document>
      {/* Page 1: Info */}
      <Page size="A4" style={styles.page}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Image
            src="/tm-official-logo.png"
            style={{ width: 180, height: 40 }}
          />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          {data.main_image_url && (
            <Image
              src={data.main_image_url}
              style={{
                width: "100%", // full width of hero
                height: "100%", // fill hero height
                objectFit: "cover", // maintain aspect ratio
                borderRadius: 8,
              }}
            />
          )}
          <View style={styles.heroOverlay}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 3,
                marginBottom: 4,
              }}
            >
              {data.tags?.map((tag: string) => (
                <View
                  key={tag}
                  style={{
                    backgroundColor: "#f97316",
                    paddingVertical: 1,
                    paddingHorizontal: 4,
                    borderRadius: 3,
                    marginBottom: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 6,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "white",
                    }}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  backgroundColor: "#2563eb",
                  paddingVertical: 1,
                  paddingHorizontal: 4,
                  borderRadius: 3,
                  marginBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 6,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  {data.type} • {data.session}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{data.subtitle}</Text>
          </View>
        </View>

        {/* Left & Right Columns */}
        <View style={styles.container}>
          {/* Left */}
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overviewText}>{data.highlight}</Text>

            {/* Info Grid */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 8,
              }}
            >
              {[
                { label: "Route", value: data.route },
                { label: "Meal Plan", value: data.meal_plan },
                { label: "Country", value: data.country },
                { label: "Type", value: data.type },
              ].map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    width: "48%",
                    backgroundColor: "#f1f5f9",
                    padding: 6,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 7,
                      color: "#64748b",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      marginBottom: 1,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

            {/* Pricing */}
            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#166534",
                  marginBottom: 4,
                }}
              >
                Pricing Details
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                  borderRadius: 6,
                }}
              >
                {/* Top */}
                <View
                  style={{
                    padding: 6,
                    backgroundColor: "#f8fafc",
                    borderBottomWidth: 1,
                    borderBottomColor: "#e2e8f0",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 6,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "#166534",
                      }}
                    >
                      Current Offer
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#2563eb",
                        marginTop: 1,
                      }}
                    >
                      RM {data.price_discount}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <View
                      style={{
                        backgroundColor: "#dcfce7",
                        paddingVertical: 1,
                        paddingHorizontal: 4,
                        borderRadius: 3,
                        marginBottom: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 6,
                          fontWeight: "bold",
                          color: "#166534",
                        }}
                      >
                        SAVE {savingsPercent(data)}%
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 6,
                        color: "#166534",
                        textDecoration: "line-through",
                      }}
                    >
                      Original: RM {data.price_original}
                    </Text>
                  </View>
                </View>
                {/* Bottom */}
                <View style={{ flexDirection: "row", padding: 6 }}>
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        fontSize: 6,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "#166534",
                        marginBottom: 1,
                      }}
                    >
                      Price From
                    </Text>
                    <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                      RM {data.price_from}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      borderLeftWidth: 1,
                      borderLeftColor: "#e2e8f0",
                      paddingLeft: 4,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 6,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "#166534",
                        marginBottom: 1,
                      }}
                    >
                      Price To
                    </Text>
                    <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                      RM {data.price_to}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Important Notes */}
            <View style={{ marginTop: 8 }}>
              {(["rules", "remarks", "payment", "cancellation"] as const).map(
                (key) => {
                  const colorMap: Record<typeof key, string> = {
                    rules: "#047857",
                    remarks: "#15803d",
                    payment: "#b45309",
                    cancellation: "#b91c1c",
                  };
                  const bgMap: Record<typeof key, any> = {
                    rules: styles.blueBox,
                    remarks: styles.greenBox,
                    payment: styles.yellowBox,
                    cancellation: styles.redBox,
                  };

                  return (
                    <View key={key} style={[styles.box, bgMap[key]]}>
                      <Text style={[styles.boxTitle, { color: colorMap[key] }]}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Text>
                      {importantNotes[key].map((item: string, idx: number) => (
                        <Text
                          key={idx}
                          style={{ fontSize: 7, marginBottom: 1 }}
                        >
                          • {item}
                        </Text>
                      ))}
                    </View>
                  );
                }
              )}
            </View>
          </View>

          {/* Right */}
          <View style={styles.rightCol}>
            <View
              style={[
                styles.box,
                {
                  backgroundColor: "#f8fafc",
                  borderColor: "#e2e8f0",
                },
              ]}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  marginBottom: 10,
                  color: "#1d4ed8",
                }}
              >
                Logistics & Rules
              </Text>

              {/* Tour Code */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text style={{ color: "#64748b" }}>Tour Code:</Text>
                <Text style={{ fontFamily: "Courier", fontWeight: "bold" }}>
                  {data.tour_code}
                </Text>
              </View>

              {/* Entry Mode */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text style={{ color: "#64748b" }}>Entry Mode:</Text>
                <Text style={{ fontWeight: "bold" }}>{data.entry_mode}</Text>
              </View>

              {/* Conditions */}
              <View style={{ marginBottom: 6 }}>
                <Text style={{ color: "#64748b", marginBottom: 2 }}>
                  Conditions:
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.conditions}</Text>
              </View>

              {/* Flight Schedule */}
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "#e2e8f0",
                  paddingTop: 6,
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    color: "#64748b",
                    fontWeight: "bold",
                    marginBottom: 4,
                  }}
                >
                  Flight Schedule
                </Text>

                {Array.isArray(data.flight_schedule) &&
                data.flight_schedule.length > 0 ? (
                  data.flight_schedule.map((item: any, idx: number) => {
                    const from = item.range?.from
                      ? new Date(item.range.from).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })
                      : "N/A";

                    const to = item.range?.to
                      ? new Date(item.range.to).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })
                      : "TBA";

                    return (
                      <View
                        key={idx}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#ffffff",
                          borderWidth: 1,
                          borderColor: "#e2e8f0",
                          borderRadius: 4,
                          padding: 6,
                          marginBottom: 4,
                        }}
                      >
                        {/* Depart */}
                        <View>
                          <Text
                            style={{
                              fontSize: 7,
                              textTransform: "uppercase",
                              color: "#64748b",
                              fontWeight: "bold",
                              marginBottom: 1,
                            }}
                          >
                            Depart
                          </Text>
                          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                            {from}
                          </Text>
                        </View>

                        {/* Arrow */}
                        <Text style={{ fontSize: 10, color: "#94a3b8" }}>
                          →
                        </Text>

                        {/* Return */}
                        <View>
                          <Text
                            style={{
                              fontSize: 7,
                              textTransform: "uppercase",
                              color: "#64748b",
                              fontWeight: "bold",
                              marginBottom: 1,
                            }}
                          >
                            Return
                          </Text>
                          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                            {to}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#94a3b8",
                      fontStyle: "italic",
                    }}
                  >
                    No flights scheduled yet.
                  </Text>
                )}
              </View>

              {/* Market */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopWidth: 1,
                  borderTopColor: "#e2e8f0",
                  paddingTop: 6,
                  marginTop: 6,
                }}
              >
                <Text style={{ color: "#64748b" }}>Market:</Text>
                <View
                  style={{
                    backgroundColor: "#e2e8f0",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                    {data.sale_able_market}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.box, styles.greenBox]}>
              <Text style={[styles.boxTitle, { color: "#15803d" }]}>
                Includes
              </Text>

              {data.package_includes?.length > 0 &&
                data.package_includes.map((inc: string, idx: number) => (
                  <View key={idx} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{inc}</Text>
                  </View>
                ))}
            </View>

            {data.package_excludes?.length > 0 && (
              <View style={[styles.box, styles.redBox]}>
                <Text style={[styles.boxTitle, { color: "#b91c1c" }]}>
                  Excludes
                </Text>

                {data.package_excludes.map((exc: string, idx: number) => (
                  <View key={idx} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{exc}</Text>
                  </View>
                ))}
              </View>
            )}
            <View style={[styles.box, styles.blueBox]}>
              <Text style={[styles.boxTitle, { color: "#312e81" }]}>
                Optional Tours
              </Text>
              <Text style={{ fontSize: 8, color: "#334155", lineHeight: 1.2 }}>
                {data.optional_tours || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 2: Itinerary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Itinerary</Text>
        {data.itinerary.map((item: any, idx: number) => {
          const parsed = typeof item === "string" ? JSON.parse(item) : item;
          return (
            <View key={idx} style={styles.itineraryRow}>
              <View style={styles.itineraryDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.dayLabel}>{parsed.day}</Text>
                <Text style={styles.dayDesc}>{parsed.description}</Text>
              </View>
            </View>
          );
        })}
        {data.package_freebies?.length > 0 && (
          <View style={[styles.box, styles.yellowBox]}>
            <Text style={[styles.boxTitle, { color: "#a16207" }]}>
              Freebies
            </Text>

            {data.package_freebies.map((freebie: string, idx: number) => (
              <View key={idx} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{freebie}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={[styles.box, styles.redBox]}>
          <Text style={[styles.boxTitle, { color: "#b91c1c" }]}>Features</Text>
          {data.features.map((f: string, idx: number) => (
            <Text key={idx} style={{ fontSize: 8 }}>
              • {f}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
