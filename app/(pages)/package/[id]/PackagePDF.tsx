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
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#0f172a",
  },

  hero: {
    height: 180,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  subtitle: { color: "white", fontSize: 10, opacity: 0.9 },

  container: { flexDirection: "row", gap: 20 },
  leftCol: { width: "65%" },
  rightCol: { width: "35%" },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid",
    paddingBottom: 5,
    marginBottom: 10,
    marginTop: 15,
  },

  overviewText: { color: "#475569", textAlign: "justify" },

  itineraryRow: { flexDirection: "row", marginBottom: 12 },
  itineraryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "black",
    marginRight: 10,
    marginTop: 3,
  },
  dayLabel: {
    fontWeight: "bold",
    color: "#1d4ed8",
    fontSize: 9,
    textTransform: "uppercase",
  },
  dayDesc: { color: "#475569", marginTop: 2 },

  box: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 10,
  },
  blueBox: { backgroundColor: "#f8fafc", borderColor: "#e2e8f0" },
  greenBox: { backgroundColor: "#f0fdf4", borderColor: "#dcfce7" },
  redBox: { backgroundColor: "#fef2f2", borderColor: "#fee2e2" },
  yellowBox: { backgroundColor: "#fefce8", borderColor: "#fef9c3" },
  boxTitle: { fontWeight: "bold", marginBottom: 5, fontSize: 11 },
});

export const PackagePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Hero */}
      <View style={styles.hero}>
        {data.main_image_url && (
          <Image
            src={data.main_image_url}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        )}

        {/* Overlay content */}
        <View style={styles.heroOverlay}>
          {/* Tags row above title */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 6,
            }}
          >
            {data.tags?.map((tag: string) => (
              <View
                key={tag}
                style={{
                  backgroundColor: "#f97316", // orange-500
                  paddingVertical: 2,
                  paddingHorizontal: 6,
                  borderRadius: 4,
                  marginBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 7,
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
                backgroundColor: "#2563eb", // blue-600
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 4,
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "white",
                }}
              >
                {data.type} • {data.session}
              </Text>
            </View>
          </View>

          {/* Title and subtitle */}
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>{data.subtitle}</Text>
        </View>
      </View>

      <View style={styles.container}>
        {/* Left Column */}
        <View style={styles.leftCol}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{data.highlight}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 10,
              justifyContent: "space-between",
            }}
          >
            {[
              { label: "Route", value: data.route },
              { label: "Meal Plan", value: data.meal_plan },
              { label: "Country", value: data.country },
            ].map((item, idx) => (
              <View
                key={idx}
                style={{
                  width: "32%", // 3 columns with small spacing
                  backgroundColor: "#f1f5f9",
                  padding: 8,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    color: "#64748b",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: 500 }}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right Column / Sidebar */}
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
              <Text style={{ color: "#64748b" }}>Flight Schedule:</Text>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  padding: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: "Courier",
                    lineHeight: 1.2,
                  }}
                >
                  {data.flight_schedule}
                </Text>
              </View>
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

          <View style={[styles.box, styles.redBox]}>
            <Text style={[styles.boxTitle, { color: "#b91c1c" }]}>
              Features
            </Text>
            {data.features.map((feature: string, idx: number) => (
              <Text style={{ fontSize: 9 }} key={idx}>
                • {feature}
              </Text>
            ))}
          </View>

          <View style={[styles.box, styles.greenBox]}>
            <Text style={[styles.boxTitle, { color: "#15803d" }]}>
              Includes
            </Text>
            <Text style={{ fontSize: 9 }}>{data.includes}</Text>
          </View>

          <View style={[styles.box, styles.redBox]}>
            <Text style={[styles.boxTitle, { color: "#b91c1c" }]}>
              Excludes
            </Text>
            <Text style={{ fontSize: 9 }}>{data.excludes}</Text>
          </View>

          <View style={[styles.box, styles.yellowBox]}>
            <Text style={[styles.boxTitle, { color: "#a16207" }]}>
              Freebies
            </Text>
            <Text style={{ fontSize: 9 }}>{data.freebies}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#eef2ff",
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#e0e7ff",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 6,
                color: "#312e81",
              }}
            >
              Optional Tours
            </Text>

            <Text
              style={{
                fontSize: 9,
                color: "#334155",
                lineHeight: 1.4,
              }}
            >
              {data.optional_tours}
            </Text>
          </View>
        </View>
      </View>
    </Page>
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
    </Page>
  </Document>
);
