namespace RemitAndBudgetAngularJS22.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TransactionInfoes", "UserInfoId", "dbo.UserInfoes");
            DropIndex("dbo.TransactionInfoes", new[] { "UserInfoId" });
            RenameColumn(table: "dbo.TransactionInfoes", name: "UserInfoId", newName: "UserInfo_UserInfoId");
            AlterColumn("dbo.TransactionInfoes", "UserInfo_UserInfoId", c => c.Int());
            CreateIndex("dbo.TransactionInfoes", "UserInfo_UserInfoId");
            AddForeignKey("dbo.TransactionInfoes", "UserInfo_UserInfoId", "dbo.UserInfoes", "UserInfoId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TransactionInfoes", "UserInfo_UserInfoId", "dbo.UserInfoes");
            DropIndex("dbo.TransactionInfoes", new[] { "UserInfo_UserInfoId" });
            AlterColumn("dbo.TransactionInfoes", "UserInfo_UserInfoId", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.TransactionInfoes", name: "UserInfo_UserInfoId", newName: "UserInfoId");
            CreateIndex("dbo.TransactionInfoes", "UserInfoId");
            AddForeignKey("dbo.TransactionInfoes", "UserInfoId", "dbo.UserInfoes", "UserInfoId", cascadeDelete: true);
        }
    }
}
