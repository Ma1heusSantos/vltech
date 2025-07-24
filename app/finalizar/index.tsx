import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { AppTheme } from "@/src/constants/colorSchemes/theme";
import { Title } from "@/src/components/Title";
import { Button } from "@/src/components/Button";
import styles from "./styles";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  attendant: string;
  issueTime: string;
  terminalId: string;
  paymentMethod: string;
  paymentAmount: number;
  items: OrderItem[];
  total: number;
}

const mockOrderDetails: OrderDetails = {
  attendant: "João Fulano",
  issueTime: "08/02/2025 às 15:36",
  terminalId: "01234",
  paymentMethod: "Visa ••••",
  paymentAmount: 56.91,
  items: [
    { id: "1", name: "Abastecimento 12L", quantity: 1, price: 45.56 },
    { id: "2", name: "Refrigerante", quantity: 1, price: 8.35 },
  ],
  total: 53.91,
};

const OrderDetailRow: React.FC<{
  label: string;
  value: string;
  textColor: string;
}> = ({ label, value, textColor }) => (
  <>
    <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    <Text style={[styles.text, { color: textColor }]}>{value}</Text>
  </>
);

const OrderItems: React.FC<{
  items: OrderItem[];
  textColor: string;
}> = ({ items, textColor }) => (
  <>
    <Text style={[styles.label, { color: textColor }]}>Itens Vendidos</Text>
    {items.map((item) => (
      <Text key={item.id} style={[styles.text, { color: textColor }]}>
        {item.quantity}X - {item.name} - R$ {item.price.toFixed(2)}
      </Text>
    ))}
  </>
);

const FinalizarPage: React.FC = () => {
  const { colors } = useTheme() as AppTheme;

  const orderDetails = useMemo(() => mockOrderDetails, []);

  const paymentInfo = useMemo(
    () =>
      `${orderDetails.paymentMethod} R$ ${orderDetails.paymentAmount.toFixed(
        2
      )}`,
    [orderDetails.paymentMethod, orderDetails.paymentAmount]
  );

  const handlePrintReceipt = () => {
    // TODO: Implementar funcionalidade de impressao do recibo
    console.log("Imprimindo recibo...");
  };

  const handleContinue = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Title name="FinalizarPage" />

      <View style={styles.detalhes}>
        <Text style={[styles.title, { color: colors.text }]}>
          Detalhes do Pedido
        </Text>

        <View style={styles.infos}>
          <OrderDetailRow
            label="Frentista"
            value={orderDetails.attendant}
            textColor={colors.second_text}
          />
          <OrderDetailRow
            label="Hora de Emissão"
            value={orderDetails.issueTime}
            textColor={colors.second_text}
          />
          <OrderDetailRow
            label="Identificador do Terminal"
            value={orderDetails.terminalId}
            textColor={colors.second_text}
          />
          <OrderDetailRow
            label="Método de Pagamento"
            value={paymentInfo}
            textColor={colors.second_text}
          />

          <OrderItems
            items={orderDetails.items}
            textColor={colors.second_text}
          />

          <OrderDetailRow
            label="Total"
            value={`R$ ${orderDetails.total.toFixed(2)}`}
            textColor={colors.second_text}
          />
        </View>
      </View>

      <Button
        title="IMPRIMIR RECIBO"
        icon={
          <MaterialCommunityIcons
            name="receipt"
            size={24}
            color={colors.text_white}
          />
        }
        onPress={handlePrintReceipt}
        color={colors.secundaria}
      />

      <Button title="Continuar" onPress={handleContinue} />
    </View>
  );
};

export default FinalizarPage;
