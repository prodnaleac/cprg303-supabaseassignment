import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../../lib/supabase";

type Book = { id: number; title: string; author: string };

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const { data, error } = await supabase
          .from("private_books")
          .select("id, title, author")
          .order("id");
        if (error) throw error;
        setBooks(data ?? []);
      } catch (e: any) {
        setErrorMsg(
          e?.message ?? "Could not load books. Check your connection.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  if (loading)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  if (errorMsg) return <Text style={styles.error}>{errorMsg}</Text>;

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => String(item.id)}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={<Text>No books found.</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  title: { fontSize: 18, fontWeight: "600" },
  author: { fontSize: 14, color: "#555", marginTop: 4 },
  error: { margin: 20, color: "#b00020" },
});
