import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1; // pagination
  const loggedIn = await getLoggedInUser(); // this is working fine
  const accounts = await getAccounts({ userId: loggedIn?.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  console.log("accountsData", accountsData);
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className={"home"}>
      <div className={"home-content"}>
        <header className={"home-header"}>
          <HeaderBox
            type={"greeting"}
            title={"Welcome"}
            user={loggedIn?.firstName || "Guest"}
            subtext={"Access and manage your account and transactions efficiently."}
          />
        </header>
        <TotalBalanceBox
          accounts={accountsData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
        />
        <RecentTransactions
          accounts={accountsData}
          transactions={accounts?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar user={loggedIn} transactions={accounts?.transactions} banks={accountsData?.slice(0, 2)} />
    </section>
  );
};

export default Home;